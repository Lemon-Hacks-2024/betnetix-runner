package entity

type Race struct {
	Id         string       `json:"id" db:"id"`
	GroupId    string       `json:"group_id" db:"group_id"`
	Results    []RaceResult `json:"results" db:"results"`
	StartedAt  int64        `json:"started_at" db:"started_at"`
	FinishedAt int64        `json:"finished_at" db:"finished_at"`
}

type RaceResult struct {
	PlayerId   string `json:"player_id" db:"player_id"`
	FinishTime int64  `json:"finish_time" db:"finish_time"`
}
