package models

type VentaItem struct {
	ID             uint      `gorm:"primaryKey"`
	VentaID        uint      `gorm:"not null"`
	Venta          Venta     `gorm:"foreignKey:VentaID"`
	ProductoID     uint      `gorm:"not null"`
	Producto       Producto  `gorm:"foreignKey:ProductoID"`
	Cantidad       uint      `gorm:"not null"`
	PrecioUnitario float64   `gorm:"not null"`
	TotalLinea     float64   `gorm:"not null"`
}
