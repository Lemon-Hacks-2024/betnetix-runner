package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"errors"
	"github.com/rs/zerolog"
)

type Race interface {
	CreateRace(race entity.Race) (string, error)
	SetResults(race entity.Race) (string, error)
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
	//existActiveRace, err := s.storage.Race.ExistActive(race.GroupId)
	//if err != nil {
	//	s.log.Error().Msgf("error checking active race: %v", err)
	//	return "", errors.New("error checking active race")
	//}

	//if existActiveRace {
	//	return "", errors.New("active race already exists")
	//}

	raceId, err := s.storage.Race.Create(race)
	if err != nil {
		s.log.Error().Msgf("error creating race: %v", err)
		return "", errors.New("error creating race")
	}

	return raceId, nil
}

func (s *RaceService) SetResults(race entity.Race) (string, error) {
	//for i := range race.Results {
	//	race.Results[i].RaceTime = race.Results[i].FinishedAt - race.StartedAt
	//}
	raceId, err := s.storage.Race.SetResults(race)
	if err != nil {
		s.log.Error().Msgf("error setting race results: %v", err)
		return "", errors.New("error setting race results")
	}
	return raceId, nil
}
