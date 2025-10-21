package models

type VentaItem struct {
	ID             uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	VentaID        uint      `gorm:"not null" json:"venta_id"`
	ProductoID     uint      `gorm:"not null" json:"producto_id"`
	Producto       Producto  `gorm:"foreignKey:ProductoID" json:"producto"`
	Cantidad       uint      `gorm:"not null" json:"cantidad"`
	PrecioUnitario float64   `gorm:"not null" json:"precio_unitario"`
	TotalLinea     float64   `gorm:"not null" json:"total_linea"`
}

