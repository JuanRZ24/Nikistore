package models

import "time"

type Gasto struct {
	ID          uint      `gorm:"primaryKey"`
	Fecha       time.Time `gorm:"autoCreateTime"`
	Categoria   string    `gorm:"size:100;not null"`
	Monto       float64   `gorm:"not null"`
	Descripcion string    `gorm:"size:255"`
}
