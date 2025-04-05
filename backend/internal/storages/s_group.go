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
	// Нормализуем игроков перед сохранением
	for i := range group.Players {
		group.Players[i].Normalize()
	}

	playersJSON, err := json.Marshal(group.Players)
	if err != nil {
		return "", fmt.Errorf("failed to marshal players: %w", err)
	}

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

func (g GroupStorage) UpdatePlayers(groupID string, players []entity.Player) error {
	// Нормализуем игроков перед обновлением
	for i := range players {
		players[i].Normalize()
	}

	playersJSON, err := json.Marshal(players)
	if err != nil {
		return fmt.Errorf("failed to marshal players: %w", err)
	}

	query := `UPDATE groups SET players = $1 WHERE id = $2 AND deleted_at = 0`

	result, err := g.postgres.DB.Exec(query, playersJSON, groupID)
	if err != nil {
		return fmt.Errorf("failed to update players: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to check update result: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("group not found or already deleted")
	}

	return nil
}

func (g GroupStorage) GetAllGroups() ([]entity.Group, error) {
	query := `
		SELECT 
			gr.id,
			gr.name,
			COALESCE(r.finished_at, 0) AS finished_at
		FROM groups gr
		LEFT JOIN LATERAL (
			SELECT finished_at
			FROM races
			WHERE races.group_id = gr.id
			ORDER BY started_at DESC
			LIMIT 1
		) r ON true
		WHERE gr.deleted_at = 0
		ORDER BY 
			COALESCE(r.finished_at, 0) DESC,
			gr.created_at DESC;
	`

	rows, err := g.postgres.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch groups with last race: %w", err)
	}
	defer rows.Close()

	var groups []entity.Group

	for rows.Next() {
		var group entity.Group

		err := rows.Scan(&group.ID, &group.Name, &group.DateTimeLastRace)
		if err != nil {
			return nil, fmt.Errorf("failed to scan group row: %w", err)
		}

		groups = append(groups, group)
	}

	return groups, nil
}

func (g GroupStorage) GetById(groupID string) (entity.Group, error) {
	query := `SELECT id, name, players, created_at FROM groups WHERE id = $1 AND deleted_at = 0`

	var group entity.Group
	var playersRaw []byte

	err := g.postgres.DB.QueryRow(query, groupID).Scan(&group.ID, &group.Name, &playersRaw, &group.DateTimeLastRace)
	if err != nil {
		return entity.Group{}, fmt.Errorf("failed to get group by id: %w", err)
	}

	if playersRaw != nil {
		if err := json.Unmarshal(playersRaw, &group.Players); err != nil {
			return entity.Group{}, fmt.Errorf("failed to unmarshal players: %w", err)
		}
	}

	return group, nil
}
