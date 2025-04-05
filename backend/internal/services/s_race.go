package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"errors"
	"github.com/rs/zerolog"
)

type Race interface {
	CreateRace(race entity.Race) (string, error)
}

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

func (s *RaceService) CreateRace(race entity.Race) (string, error) {
	raceId, err := s.storage.Race.Create(race)
	if err != nil {
		s.log.Error().Msgf("error creating race: %v", err)
		return "", errors.New("error creating race")
	}

	return raceId, nil
}
