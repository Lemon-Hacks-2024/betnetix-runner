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
	Simulate(group entity.Group) entity.Race
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
	raceId, err := s.storage.Race.SetResults(race)
	if err != nil {
		s.log.Error().Msgf("error setting race results: %v", err)
		return "", errors.New("error setting race results")
	}
	return raceId, nil
}

type resultWithTime struct {
	entity.RaceResult
	raceTimeSec float64
}

func (s *RaceService) Simulate(group entity.Group) entity.Race {
	const trackLength float64 = 100
	startTime := time.Now().Unix()

	var results []resultWithTime

	for _, p := range group.Players {
		// Инициализация параметров
		distance := 0.0
		speed := p.ReactionTime * p.Acceleration // стартовая скорость
		timeElapsed := 0.0

		// Смоделируем забег
		for distance < trackLength {
			// Применение случайного вырыва (в 10% случаев)
			if rand.Float64() < 0.1 {
				speed += p.MaxSpeed * 0.2
			}

			// Ускорение до max speed
			if speed < p.MaxSpeed {
				speed += p.Acceleration
				if speed > p.MaxSpeed {
					speed = p.MaxSpeed
				}
			} else {
				speed *= (1 - p.CoffSpeedLoos)
			}

			// Считаем перемещение за 1 секунду
			distance += speed
			timeElapsed += 1
		}

		results = append(results, resultWithTime{
			RaceResult: entity.RaceResult{
				PlayerId:     p.ID,
				Distance:     int64(trackLength),
				RaceTime:     timeElapsed,
				FinishedAt:   startTime + int64(timeElapsed),
				CurrentSpeed: int64(speed),
			},
			raceTimeSec: timeElapsed,
		})
	}

	// Определяем позиции по времени
	sort.Slice(results, func(i, j int) bool {
		return results[i].raceTimeSec < results[j].raceTimeSec
	})
	for i := range results {
		results[i].Position = i + 1
	}

	// Преобразуем в обычный []RaceResult
	finalResults := make([]entity.RaceResult, len(results))
	for i, r := range results {
		finalResults[i] = r.RaceResult
	}

	return entity.Race{
		GroupId:    group.ID,
		StartedAt:  startTime,
		FinishedAt: startTime + int64(maxRaceTime(results)),
		Results:    finalResults,
	}
}

func maxRaceTime(results []resultWithTime) float64 {
	max := 0.0
	for _, r := range results {
		if r.raceTimeSec > max {
			max = r.raceTimeSec
		}
	}
	return max
}
