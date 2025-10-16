package models

import "time"

type Presupuesto struct {
	ID            uint      `gorm:"primaryKey"`
	Nombre        string    `gorm:"size:100;not null"`
	MontoPlaneado float64   `gorm:"not null"`
	MontoReal     float64   `gorm:"default:0"`
	FechaInicio   time.Time `gorm:"not null"`
	FechaFin      time.Time `gorm:"not null"`
}
