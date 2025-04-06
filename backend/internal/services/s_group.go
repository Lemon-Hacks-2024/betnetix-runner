package services

import (
	"backend-service/internal/entity"
	"backend-service/internal/storages"
	"fmt"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"math/rand"
)

type GroupService struct {
	log     zerolog.Logger
	storage *storages.Storage
}

func (g GroupService) UpdateGroupName(groupID string, name string) error {
	err := g.storage.Group.UpdateName(groupID, name)
	if err != nil {
		g.log.Error().Err(err).Str("group_id", groupID).Msg("не удалось обновить имя группы")
		return fmt.Errorf("не удалось обновить имя группы: %w", err)
	}
	return nil
}

func NewGroupService(log zerolog.Logger, storage *storages.Storage) *GroupService {
	return &GroupService{
		log:     log,
		storage: storage,
	}
}

func (g GroupService) UpdatePlayers(groupID string, players []entity.Player) error {
	return g.storage.Group.UpdatePlayers(groupID, players)
}

func (s *GroupService) GetRandomPlayers() ([]entity.Player, error) {
	var players []entity.Player

	defaultHexColors := []string{
		"#FF5733", // оранжевый
		"#33C1FF", // голубой
		"#75FF33", // салатовый
		"#FF33EC", // розовый
		"#FFD433", // жёлтый
		"#8D33FF", // фиолетовый
	}

	for i := 0; i < 6; i++ {
		player := entity.Player{
			ID:            uuid.New().String(),
			Name:          "Игрок " + string(rune('A'+i)),
			Number:        i + 1,
			Color:         defaultHexColors[i%len(defaultHexColors)],
			ReactionTime:  0.1 + rand.Float64()*(0.3-0.1),    // Реакция в диапазоне 0.1 до 0.3 секунд
			Acceleration:  8 + rand.Float64()*(12-7),         // Ускорение от 8 до 12 м/с²
			MaxSpeed:      10 + rand.Float64()*(12-10),       // Максимальная скорость от 10 до 12 м/с
			CoffSpeedLoos: 0.01 + rand.Float64()*(0.05-0.01), // Коэффициент потери скорости от 0.01 до 0.05
		}

		player.Normalize()
		players = append(players, player)
	}

	return players, nil
}

func (g GroupService) GetGroup(groupID string) (entity.Group, error) {
	group, err := g.storage.Group.GetById(groupID)
	if err != nil {
		g.log.Error().Err(err).Msg("не удалось получить группу")
		return entity.Group{}, err
	}

	races, err := g.storage.Race.GetAllByGroupID(groupID)
	if err != nil {
		g.log.Error().Err(err).Msg("не удалось получить группу")
		return entity.Group{}, err
	}

	group.Races = races
	return group, nil
}

func (g GroupService) GetGroups() ([]entity.Group, error) {
	groups, err := g.storage.Group.GetAllGroups()
	if err != nil {
		return nil, fmt.Errorf("не удалось получить группы: %w", err)
	}
	return groups, nil
}

func (g GroupService) CreateGroup(group entity.Group) (string, error) {
	var defaultHexColors = []string{
		"#FF5733", // оранжевый
		"#33C1FF", // голубой
		"#75FF33", // салатовый
		"#FF33EC", // розовый
		"#FFD433", // жёлтый
		"#8D33FF", // фиолетовый
	}

	// Генерируем ID для группы, если он не задан
	if group.ID == "" {
		group.ID = uuid.New().String()
	}

	// Если игроки не заданы — создаём 6 случайных
	if len(group.Players) == 0 {
		for i := 0; i < 6; i++ {
			player := entity.Player{
				ID:            uuid.New().String(),
				GroupID:       group.ID,
				Name:          fmt.Sprintf("Участник %d", i+1),
				Color:         defaultHexColors[i%len(defaultHexColors)],
				Number:        i + 1,
				ReactionTime:  0.1 + rand.Float64()*(0.3-0.1),
				Acceleration:  2 + rand.Float64()*3,
				MaxSpeed:      7 + rand.Float64()*4,
				CoffSpeedLoos: 0.05 + rand.Float64()*0.15,
			}
			group.Players = append(group.Players, player)
		}
	}

	id, err := g.storage.Group.Create(group)
	if err != nil {
		return "", fmt.Errorf("не удалось создать группу: %w", err)
	}

	return id, nil
}
