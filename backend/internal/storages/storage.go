package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
)

type Group interface {
	Create(group entity.Group) (string, error)
}

type Storage struct {
	Group
	Race
}

func NewStorage(pg *database.PostgresDB, redis *database.Redis) *Storage {
	return &Storage{
		Group: NewGroupStorage(pg),
		Race:  NewRaceStorage(pg, redis),
	}
}
