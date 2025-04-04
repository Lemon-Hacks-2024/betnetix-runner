package entity

type Player struct {
	ID            string  `json:"id" db:"id"`
	GroupID       string  `json:"race_id" db:"race_id"`
	Name          string  `json:"name" db:"name"`                       // Имя участника
	Color         string  `json:"color" db:"color"`                     // Цвет майки
	Number        string  `json:"number" db:"number"`                   // Номер участника
	ReactionTime  float64 `json:"reaction_time" db:"reaction_time"`     // Время реакции (сек)
	Acceleration  float64 `json:"acceleration" db:"acceleration"`       // Ускорение (м/с²)
	MaxSpeed      float64 `json:"max_speed" db:"max_speed"`             // Максимальная скорость (м/с)
	CoffSpeedLoos float64 `json:"coff_speed_loss" db:"coff_speed_loss"` // Коэффициент потери скорости
}
