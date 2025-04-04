package storages

import (
	"backend-service/internal/entity"
	"backend-service/pkg/database"
	"encoding/json"
	"fmt"
)

type GroupStorage struct {
	postgres *database.PostgresDB
}

func NewGroupStorage(pg *database.PostgresDB) *GroupStorage {
	return &GroupStorage{
		postgres: pg,
	}
}

func (g GroupStorage) Create(group entity.Group) (string, error) {
	// Сериализуем игроков в JSONB
	playersJSON, err := json.Marshal(group.Players)
	if err != nil {
		return "", fmt.Errorf("failed to marshal players: %w", err)
	}

	// Вставка группы в БД
	query := `
		INSERT INTO groups (id, name, players, created_at, deleted_at)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id;
	`

	var insertedID string
	err = g.postgres.DB.QueryRow(
		query,
		group.ID,
		group.Name,
		playersJSON,
		group.DateTimeLastRace, // сохраняем как created_at
		0,                      // deleted_at по умолчанию 0
	).Scan(&insertedID)

	if err != nil {
		return "", fmt.Errorf("failed to insert group: %w", err)
	}

	return insertedID, nil
}
