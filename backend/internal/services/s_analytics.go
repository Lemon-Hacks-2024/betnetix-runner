package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"fmt"
	"github.com/rs/zerolog"
	"math"
	"sort"
	"time"
)

type AnalyticsService struct {
	log     zerolog.Logger
	storage *storages.Storage
}

func (a AnalyticsService) GetPlaceProbabilities(groupID string) ([]entity.PlaceProbability, error) {
	group, err := a.storage.Group.GetById(groupID)
	if err != nil {
		a.log.Error().Err(err).Msg("failed to get group")
		return nil, fmt.Errorf("failed to get group: %w", err)
	}

	if len(group.Players) == 0 {
		return nil, fmt.Errorf("group has no players")
	}

	// Собираем RaceResults из всех Races
	playerResults := make(map[string][]entity.RaceResult)
	for _, race := range group.Races {
		for _, result := range race.Results {
			playerResults[result.PlayerId] = append(playerResults[result.PlayerId], result)
		}
	}

	// Создаём студентов с усреднённым временем, если есть прошлые забеги
	var students []entity.Student
	for _, player := range group.Players {
		results := playerResults[player.ID]

		var avgRaceTime float64
		if len(results) > 0 {
			var total int64
			for _, res := range results {
				total += res.RaceTime
			}
			avgRaceTime = float64(total) / float64(len(results)) / 1000.0 // перевод в секунды
		}

		students = append(students, entity.Student{
			Name:          player.ID,
			ReactionTime:  player.ReactionTime,
			Acceleration:  player.Acceleration,
			MaxSpeed:      player.MaxSpeed,
			SpeedLossCoef: player.CoffSpeedLoos,
			RaceTime:      avgRaceTime, // возможно, не обязательно, но может быть полезно
		})
	}

	results := performNRaces(students, 1000)

	var output []entity.PlaceProbability
	for _, res := range results {
		output = append(output, entity.PlaceProbability{
			PlayerID:          res.PlayerID,
			PlacesProbability: res.PlacesProbability,
		})
	}

	return output, nil
}

func NewAnalyticsService(log zerolog.Logger, storage *storages.Storage) *AnalyticsService {
	return &AnalyticsService{
		log:     log,
		storage: storage,
	}
}

func performNRaces(students []entity.Student, N int) []entity.PlaceProbability {
	type stats struct {
		PlaceCount [6]int
	}

	statsMap := make(map[string]*stats)
	originals := make([]entity.Student, len(students))
	copy(originals, students)

	for _, s := range students {
		statsMap[s.Name] = &stats{}
	}

	for race := 0; race < N; race++ {
		for i := range students {
			base := originals[i]
			students[i].ReactionTime = jitter(base.ReactionTime, 0.05)
			students[i].Acceleration = jitter(base.Acceleration, 0.05)
			students[i].MaxSpeed = jitter(base.MaxSpeed, 0.05)
			students[i].SpeedLossCoef = jitter(base.SpeedLossCoef, 0.05)
		}

		result := simulateRace(students)
		for place, student := range result {
			statsMap[student.Name].PlaceCount[place]++
		}
	}

	total := float64(N)
	epsilon := 1.0 // для сглаживания

	var output []entity.PlaceProbability
	for _, s := range students {
		res := entity.PlaceProbability{
			PlayerID:          s.Name,
			PlacesProbability: make([]float64, 6),
		}
		for i := 0; i < 6; i++ {
			count := float64(statsMap[s.Name].PlaceCount[i])
			res.PlacesProbability[i] = (count + epsilon) / (total + epsilon*6)
		}
		output = append(output, res)
	}
	return output
}

func simulateRace(students []entity.Student) []entity.Student {
	const distance = 100.0
	for i := range students {
		s := &students[i]
		timeToMaxSpeed := s.MaxSpeed / s.Acceleration
		distanceAccel := 0.5 * s.Acceleration * math.Pow(timeToMaxSpeed, 2)
		if distanceAccel >= distance {
			s.RaceTime = math.Sqrt(2*distance/s.Acceleration) + s.ReactionTime
			continue
		}
		distanceConstantSpeed := distance - distanceAccel
		timeConstantSpeed := distanceConstantSpeed / s.MaxSpeed
		timeWithSpeedLoss := timeConstantSpeed * (1 + s.SpeedLossCoef)
		s.RaceTime = s.ReactionTime + timeToMaxSpeed + timeWithSpeedLoss
	}
	sort.Slice(students, func(i, j int) bool {
		return students[i].RaceTime < students[j].RaceTime
	})
	return students
}

func jitter(base, percent float64) float64 {
	deviation := base * percent
	return base + (randFloat64()*2*deviation - deviation)
}

func randFloat64() float64 {
	// math/rand is not seeded outside of main, so we use time-based fallback
	return float64(time.Now().UnixNano()%1e6) / 1e6
}
