package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"errors"
	"github.com/rs/zerolog"
	"math/rand"
	"sort"
	"time"
)

type Race interface {
	CreateRace(race entity.Race) (string, error)
	SetResults(race entity.Race) (string, error)
	SimulateNRacesForGroup(group entity.Group, count int) error
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
	s.log.Debug().Msgf("race results: %v", race)
	for i := range race.Results {
		race.Results[i].RaceTime = race.Results[i].FinishedAt - race.StartedAt
	}
	raceId, err := s.storage.Race.SetResults(race)
	if err != nil {
		s.log.Error().Msgf("error setting race results: %v", err)
		return "", errors.New("error setting race results")
	}
	return raceId, nil
}

func (s *RaceService) SimulateNRacesForGroup(group entity.Group, count int) error {
	if len(group.Players) == 0 {
		return errors.New("группа не содержит участников")
	}

	for i := 0; i < count; i++ {
		race := s.simulateInstantRace(group.ID, group.Players)
		_, err := s.SetResults(race)
		if err != nil {
			s.log.Error().Err(err).Msgf("не удалось сохранить результаты забега #%d", i+1)
			return err
		}
	}
	return nil
}

func (s *RaceService) simulateInstantRace(groupID string, players []entity.Player) entity.Race {
	const trackLength = 100
	now := time.Now().UTC().Unix()

	results := make([]entity.RaceResult, len(players))
	speeds := make([]float64, len(players))

	for i, p := range players {
		speeds[i] = p.ReactionTime * p.Acceleration
		results[i] = entity.RaceResult{PlayerId: p.ID}
	}

	var tick int64
	finished := false

	for !finished {
		tick++
		finished = true

		for i, p := range players {
			if results[i].Distance >= trackLength {
				continue
			}

			// Рывок
			if rand.Float64() < 0.1 {
				speeds[i] += p.MaxSpeed * 0.2
			}

			// Разгон или замедление
			if speeds[i] < p.MaxSpeed {
				speeds[i] += p.Acceleration
				if speeds[i] > p.MaxSpeed {
					speeds[i] = p.MaxSpeed
				}
			} else {
				speeds[i] *= (1 - p.CoffSpeedLoos)
			}

			newDistance := float64(results[i].Distance) + speeds[i]
			if newDistance >= trackLength {
				results[i].Distance = trackLength
				results[i].FinishedAt = now + tick
			} else {
				results[i].Distance = int64(newDistance)
				finished = false
			}
			results[i].CurrentSpeed = int64(speeds[i])
		}
	}

	// Позиции
	sort.Slice(results, func(i, j int) bool {
		return results[i].Distance > results[j].Distance
	})
	for i := range results {
		results[i].Position = i + 1
		results[i].RaceTime = results[i].FinishedAt - now
	}

	return entity.Race{
		Id:         "",
		GroupId:    groupID,
		Results:    results,
		StartedAt:  now,
		FinishedAt: now + tick,
	}
}
