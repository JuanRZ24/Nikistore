package models

import "time"

type MovimientoStock struct {
	ID          uint      `gorm:"primaryKey"`
	ProductoID  uint      `gorm:"not null"`
	Producto    Producto  `gorm:"foreignKey:ProductoID"`
	Tipo        string    `gorm:"not null"`
	Cantidad    int       `gorm:"not null"`
	Referencia  string    `gorm:"size:100"`
	Fecha       time.Time `gorm:"autoCreateTime"`
}
