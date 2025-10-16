package models

import "time"

type Ingreso struct {
	ID          uint      `gorm:"primaryKey"`
	Fecha       time.Time `gorm:"autoCreateTime"`
	Origen      string    `gorm:"not null"`
	Monto       float64   `gorm:"not null"`
	Descripcion string    `gorm:"size:255"`
	RelacionID  string    `gorm:"size:100"`
}
