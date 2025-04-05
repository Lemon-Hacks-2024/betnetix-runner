package services

import (
	"backend-service/internal/storages"
	"github.com/rs/zerolog"
)

type Service struct {
	Race Race
}

func NewService(log zerolog.Logger, storage *storages.Storage) *Service {
	return &Service{
		Race: NewRaceService(log, storage),
	}
}
