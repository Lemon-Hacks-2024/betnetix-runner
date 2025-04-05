package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"github.com/rs/zerolog"
)

type Group interface {
	CreateGroup(group entity.Group) (string, error)
	GetGroups() ([]entity.Group, error)
	GetGroup(groupID string) (entity.Group, error)
	GetRandomPlayers() ([]entity.Player, error)
	UpdatePlayers(groupID string, players []entity.Player) error
}

type Service struct {
	Group
	Race
}

func NewService(log zerolog.Logger, storage *storages.Storage) *Service {
	return &Service{
		Group: NewGroupService(log, storage),
		Race:  NewRaceService(log, storage),
	}
}
