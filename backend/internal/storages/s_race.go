package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
	"time"
)

type Race interface {
	Create(race entity.Race) (string, error)
	GetAllByGroupId(groupID string) ([]entity.Race, error)
	SetResults(race entity.Race) (string, error)
	GetLastRace(groupID string) (entity.Race, error)
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
	query := `INSERT INTO races (id, group_id, started_at) VALUES ($1, $2, $3) RETURNING id`
	var id string
	err := s.postgres.DB.QueryRow(query, race.Id, race.GroupId, time.Now().UTC().Unix()).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (s *RaceStorage) GetAllByGroupId(groupID string) ([]entity.Race, error) {
	query := `SELECT id, group_id FROM races WHERE group_id = $1`
	var races []entity.Race
	err := s.postgres.DB.Select(&races, query, groupID)
	if err != nil {
		return nil, err
	}
	return races, nil
}

func (s *RaceStorage) SetResults(race entity.Race) (string, error) {
	query := `UPDATE races SET results = $1 WHERE id = $2 RETURNING id`
	var id string
	err := s.postgres.DB.QueryRow(query, race.Result, race.Id).Scan(&id)
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
