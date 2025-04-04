package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
)

type raceStorage struct {
	postgres *database.PostgresDB
}

func NewRaceStorage(pg *database.PostgresDB) *raceStorage {
	return &raceStorage{
		postgres: pg,
	}
}

func (s *raceStorage) Create(race entity.Race) (string, error) {
	query := `INSERT INTO races (id, group_id) VALUES ($1, $2) RETURNING id`
	var id string
	err := s.postgres.DB.QueryRow(query, race.ID, race.GroupID).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, nil
}
