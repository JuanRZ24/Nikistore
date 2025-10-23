package models



import "time"



type Producto struct {
    ID           uint      `gorm:"primaryKey"`
    Nombre       string    `gorm:"size:100;not null"`
    CategoriaID  uint      `gorm:"not null"`
    Categoria    Categoria `gorm:"foreignKey:CategoriaID" json:"categoria"`
    PrecioCompra float64   `gorm:"not null"`
    PrecioVenta  float64   `gorm:"not null"`
    Stock        int       `gorm:"default:0"`
    FechaIngreso time.Time `gorm:"autoCreateTime"`
    Activo       bool      `gorm:"default:true"`
}
