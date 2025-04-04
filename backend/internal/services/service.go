package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"github.com/rs/zerolog"
)

type Player interface {
	CreatePlayer(player entity.Player) (string, error)
}

type Race interface {
	CreateRace(race entity.Race) (string, error)
}

type Service struct {
	Player
	Race
}

func NewService(log zerolog.Logger, storage *storages.Storage) *Service {
	return &Service{
		//Player: NewPlayerService(log, storage),
		Race: NewRaceService(log, storage),
	}
}
