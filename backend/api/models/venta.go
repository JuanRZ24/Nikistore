package models

import "time"

type Venta struct {
	ID          uint      `gorm:"primaryKey"`
	Fecha       time.Time `gorm:"autoCreateTime"`
	Cliente     string    `gorm:"size:100"` // opcional
	MetodoPago string `gorm:"size:20;not null"`
	SubTotal    float64   `gorm:"not null"`
	Descuento   float64   `gorm:"default:0"`
	Impuestos   float64   `gorm:"default:0"`
	Total       float64   `gorm:"not null"`
	Estado     string `gorm:"size:20;default:'completada'"`
}
