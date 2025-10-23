package models

import "time"

type Compra struct {
	ID                 uint        `gorm:"primaryKey" json:"id"`
	Fecha              time.Time   `gorm:"autoCreateTime" json:"fecha"`
	CostoEnvioTotal    float64     `json:"costo_envio_total"`     // costo del envío global
	CostoEmpaqueTotal  float64     `json:"costo_empaque_total"`   // costo de empaques global
	PorcentajeGanancia float64     `json:"porcentaje_ganancia"`   // % de ganancia deseado
	Total              float64     `gorm:"not null" json:"total"` // total de la compra
	Estado             string      `gorm:"size:20;default:'completada'" json:"estado"`
	CompraItems        []CompraItem `gorm:"foreignKey:CompraID" json:"compra_items"`
}
