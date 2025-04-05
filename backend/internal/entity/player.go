package entity

import "math"

type Player struct {
	ID            string  `json:"id" db:"id"`
	GroupID       string  `json:"group_id" db:"group_id"`
	Name          string  `json:"name" db:"name"`                       // Имя участника
	Color         string  `json:"color" db:"color"`                     // Цвет майки
	Number        int     `json:"number" db:"number"`                   // Номер участника
	ReactionTime  float64 `json:"reaction_time" db:"reaction_time"`     // Время реакции (сек)
	Acceleration  float64 `json:"acceleration" db:"acceleration"`       // Ускорение (м/с²)
	MaxSpeed      float64 `json:"max_speed" db:"max_speed"`             // Максимальная скорость (м/с)
	CoffSpeedLoos float64 `json:"coff_speed_loss" db:"coff_speed_loss"` // Коэффициент потери скорости
}

func Round2(f float64) float64 {
	return math.Round(f*100) / 100
}

func (p *Player) Normalize() {
	p.ReactionTime = Round2(p.ReactionTime)
	p.Acceleration = Round2(p.Acceleration)
	p.MaxSpeed = Round2(p.MaxSpeed)
	p.CoffSpeedLoos = Round2(p.CoffSpeedLoos)
}
