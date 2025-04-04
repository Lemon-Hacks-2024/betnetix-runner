package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type RaceService struct {
	log     zerolog.Logger
	storage *storages.Storage
}

func NewRaceService(log zerolog.Logger, storage *storages.Storage) *RaceService {
	return &RaceService{
		log:     log,
		storage: storage,
	}
}

func (s *RaceService) CreateRace(r entity.Race) (string, error) {
	if r.ID == "" {
		r.ID = uuid.New().String()
	}
	return s.storage.Race.Create(r)
}
