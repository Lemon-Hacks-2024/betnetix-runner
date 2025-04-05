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
		group.DateTimeLastRace,
		0,
	).Scan(&insertedID)

	if err != nil {
		return "", fmt.Errorf("failed to insert group: %w", err)
	}

	return insertedID, nil
}

func (g GroupStorage) GetAllGroups() ([]entity.Group, error) {
	query := `SELECT id, name, players, created_at FROM groups WHERE deleted_at = 0`

	rows, err := g.postgres.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch groups: %w", err)
	}
	defer rows.Close()

	var groups []entity.Group

	for rows.Next() {
		var group entity.Group
		var playersRaw []byte

		err := rows.Scan(&group.ID, &group.Name, &playersRaw, &group.DateTimeLastRace)
		if err != nil {
			return nil, fmt.Errorf("failed to scan group row: %w", err)
		}

		if err := json.Unmarshal(playersRaw, &group.Players); err != nil {
			return nil, fmt.Errorf("failed to unmarshal players: %w", err)
		}

		groups = append(groups, group)
	}

	return groups, nil
}
