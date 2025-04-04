package entity

type Race struct {
	ID      string `json:"id" db:"id"`
	GroupID string `json:"group_id" db:"group_id"` // Foreign key to group
}
