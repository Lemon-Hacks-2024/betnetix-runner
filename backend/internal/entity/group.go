package entity

type Group struct {
	ID               string   `json:"id" db:"id"`
	Name             string   `json:"name" db:"name"`
	DateTimeLastRace int64    `json:"date_time_last_race" db:"date_time_last_race"`
	Races            []Race   `json:"races"`
	Players          []Player `json:"players"`
}
