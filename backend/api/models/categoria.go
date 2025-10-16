package models

import "time"

type Categoria struct{
	ID				uint 		`gorm:"primaryKey;autoIncrement"`
	Nombre 			string 		`gorm:"size:100;not null"`
	Descripcion 	string 		`gorm:"size:255"`
	FechaCreacion 	time.Time 	`gorm:"autoCreateTime"`
	Activa			bool		`gorm:"default:true"`
}