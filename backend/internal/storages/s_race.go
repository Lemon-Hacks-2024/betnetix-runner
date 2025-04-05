package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
	"encoding/json"
	"fmt"
	"time"
)

type Race interface {
	Create(race entity.Race) (string, error)
	SetResults(race entity.Race) (string, error)
	GetLastRace(groupID string) (entity.Race, error)
	ExistActive(groupID string) (bool, error)
	GetAllByGroupID(groupID string) ([]entity.Race, error)
}

type RaceStorage struct {
	postgres *database.PostgresDB
	redis    *database.Redis
}

func NewRaceStorage(pg *database.PostgresDB, redis *database.Redis) *RaceStorage {
	return &RaceStorage{
		postgres: pg,
		redis:    redis,
	}
}

func (s *RaceStorage) Create(race entity.Race) (string, error) {
	// Сериализуем в JSONB
	raceResultJSONB, err := json.Marshal(race.Results)
	if err != nil {
		return "", fmt.Errorf("failed to marshal race results: %w", err)
	}
	query := `INSERT INTO races (group_id, results, started_at) VALUES ($1, $2, $3) RETURNING id`
	var id string
	err = s.postgres.DB.QueryRow(query, race.GroupId, raceResultJSONB, time.Now().UTC().Unix()).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (s *RaceStorage) GetAllByGroupID(groupID string) ([]entity.Race, error) {
	query := `
		SELECT id, group_id, results, started_at, finished_at
		FROM races
		WHERE group_id = $1 AND finished_at IS NOT NULL
		ORDER BY started_at ASC
	`

	rows, err := s.postgres.DB.Query(query, groupID)
	if err != nil {
		return nil, fmt.Errorf("failed to query races by group_id: %w", err)
	}
	defer rows.Close()

	var races []entity.Race

	for rows.Next() {
		var (
			race        entity.Race
			resultsJSON []byte
		)

		if err := rows.Scan(
			&race.Id,
			&race.GroupId,
			&resultsJSON,
			&race.StartedAt,
			&race.FinishedAt,
		); err != nil {
			return nil, fmt.Errorf("failed to scan race row: %w", err)
		}

		if err := json.Unmarshal(resultsJSON, &race.Results); err != nil {
			return nil, fmt.Errorf("failed to unmarshal race results: %w", err)
		}

		races = append(races, race)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return races, nil
}

func (s *RaceStorage) SetResults(race entity.Race) (string, error) {
	// Сериализуем в JSONB
	raceResultJSONB, err := json.Marshal(race.Results)
	if err != nil {
		return "", fmt.Errorf("failed to marshal race results: %w", err)
	}

	query := `UPDATE races SET results = $2, started_at = $4, finished_at = $3 WHERE id = $1 RETURNING id`
	var id string
	err = s.postgres.DB.QueryRow(query, race.Id, raceResultJSONB, race.StartedAt, race.FinishedAt).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (s *RaceStorage) GetLastRace(groupID string) (entity.Race, error) {
	query := `SELECT id, group_id, results FROM races WHERE group_id = $1 ORDER BY started_at DESC LIMIT 1`
	var race entity.Race
	err := s.postgres.DB.Get(&race, query, groupID)
	if err != nil {
		return entity.Race{}, err
	}
	return race, nil
}

func (s *RaceStorage) ExistActive(groupID string) (bool, error) {
	query := `SELECT EXISTS (SELECT 1 FROM races WHERE group_id = $1 AND finished_at IS NULL)`
	var exists bool
	err := s.postgres.DB.Get(&exists, query, groupID)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (s *RaceStorage) GetAllActive() ([]entity.Race, error) {
	query := `SELECT id, group_id FROM races WHERE finished_at IS NULL`
	var races []entity.Race
	err := s.postgres.DB.Select(&races, query)
	if err != nil {
		return nil, err
	}
	return races, nil
}

func (s *RaceStorage) SetLockRace(raceId string) error {
	key := fmt.Sprintf("race-lock:%s", raceId)
	err := s.redis.Client.Set(key, true, time.Minute*1).Err()
	if err != nil {
		return err
	}
	return nil
}

func (s *RaceStorage) GetLockRace(raceId string) bool {
	key := fmt.Sprintf("race-lock:%s", raceId)
	val, err := s.redis.Client.Get(key).Result()
	if err != nil {
		return false
	}

	return val == "1"
}
