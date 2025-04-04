package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
)

type Group interface {
	Create(group entity.Group) (string, error)
}

type Race interface {
	Create(race entity.Race) (string, error)
}

type Storage struct {
	Race
	Group
}

func NewStorage(postgres *database.PostgresDB) *Storage {
	return &Storage{
		Group: NewGroupStorage(postgres),
		Race:  NewRaceStorage(postgres),
	}
}
