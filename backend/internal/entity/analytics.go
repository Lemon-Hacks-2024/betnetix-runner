package entity

type PlaceProbability struct {
	PlayerID          string    `json:"player_id"`
	PlacesProbability []float64 `json:"places_probability"` // 1–6 места
}

type ResultOutput struct {
	PlayerId          string    `json:"player_id"`
	PlacesProbability []float64 `json:"places_probability"`
}

type Student struct {
	Name          string
	ReactionTime  float64
	Acceleration  float64
	MaxSpeed      float64
	SpeedLossCoef float64
	RaceTime      float64
}

type Top2Probability struct {
	PlayerID        string  `json:"player_id"`
	Top2Probability float64 `json:"top_probability"`
}

type Top3Probability struct {
	PlayerID        string  `json:"player_id"`
	Top3Probability float64 `json:"top_probability"`
}

type PairChance struct {
	ID     string  `json:"id"`
	Chance float64 `json:"chance"`
}
