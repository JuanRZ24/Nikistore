package models

type CompraItem struct {
	ID              uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	CompraID        uint      `gorm:"not null" json:"compra_id"`
	ProductoID      uint      `json:"producto_id"`
	Producto        Producto  `gorm:"foreignKey:ProductoID" json:"producto"`
	Cantidad        uint      `gorm:"not null" json:"cantidad"`
	PrecioUnitario  float64   `gorm:"not null" json:"precio_unitario"`
	TotalLinea      float64   `gorm:"not null" json:"total_linea"`

	// 🔹 Costos calculados por unidad
	CostoEnvioUnit     float64 `json:"costo_envio_unit"`     // envío dividido por unidad
	CostoEmpaqueUnit   float64 `json:"costo_empaque_unit"`   // empaque dividido por unidad
	CostoTotalUnit     float64 `json:"costo_total_unit"`     // precio_unitario + envío + empaque

	// 🔹 Precio sugerido de venta (según % de ganancia)
	PrecioSugeridoVenta float64 `json:"precio_sugerido_venta"`
}
