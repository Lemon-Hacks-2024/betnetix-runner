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
	UpdateGroupName(groupID string, name string) error
}

type Analytics interface {
	GetPlaceProbabilities(groupID string) ([]entity.PlaceProbability, error)
	GetTops2Probabilities(groupID string) ([]entity.Top2Probability, error)
	GetTop3Probabilities(groupID string) ([]entity.Top3Probability, error)
	GetPairPlaceProbabilities(groupID string) ([][]entity.PairChance, error)
}

type Service struct {
	Group
	Race
	Analytics
}

func NewService(log zerolog.Logger, storage *storages.Storage) *Service {
	return &Service{
		Group:     NewGroupService(log, storage),
		Race:      NewRaceService(log, storage),
		Analytics: NewAnalyticsService(log, storage),
	}
}
