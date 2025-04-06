package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
)

type Group interface {
	Create(group entity.Group) (string, error)
	GetAllGroups() ([]entity.Group, error)
	GetById(groupID string) (entity.Group, error)
	UpdatePlayers(groupID string, players []entity.Player) error
	UpdateName(groupID string, newName string) error
}

type Storage struct {
	Race
	Group
}

func NewStorage(pg *database.PostgresDB, redis *database.Redis) *Storage {
	return &Storage{
		Group: NewGroupStorage(pg),
		Race:  NewRaceStorage(pg, redis),
	}
}
