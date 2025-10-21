package handlers


import (
	"encoding/json"
	"net/http"
	"Nikistore/config"
	"Nikistore/api/models"
	"fmt"
)



func VentaHandler(w http.ResponseWriter, r *http.Request){
	switch r.Method{
	case http.MethodPost:
		crearVenta(w,r)
	case http.MethodGet:
		obtenerVentas(w,r)
	case http.MethodDelete:
	
	default:
	}
}



func crearVenta(w http.ResponseWriter, r *http.Request){
	var venta models.Venta

	if err := json.NewDecoder(r.Body).Decode(&venta); err != nil {
		http.Error(w, "JSON invalid", http.StatusBadRequest)
		return
	}

	tx := config.DB.Begin()

	if err := tx.Create(&venta).Error; err != nil {
		tx.Rollback()
		return
		}

	
	for i := range venta.VentaItems {
		venta.VentaItems[i].ID = 0
    	venta.VentaItems[i].VentaID = venta.ID
    	if err := tx.Create(&venta.VentaItems[i]).Error; err != nil {
        	tx.Rollback()
        	return
    }

}
	ingreso := models.Ingreso{
		Origen: "venta",
		Monto:	venta.Total,
		Descripcion: fmt.Sprintf("Venta #%d al cliente %s", venta.ID, venta.Cliente),
		RelacionID: fmt.Sprintf("venta:%d",venta.ID),

	}

	if err := tx.Create(&ingreso).Error; err != nil {
		tx.Rollback()
		return
	}

	tx.Commit()

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"Venta creada con exito",
		"data":venta,
	})
	

}




func obtenerVentas (w http.ResponseWriter, r *http.Request){
	var ventas []models.Venta


	if err := config.DB.
		Preload("VentaItems.Producto").
		Find(&ventas).Error; err != nil {
		http.Error(w, "Error al obtener las ventas", http.StatusInternalServerError)
		return
		}

	if len(ventas) == 0 {
		w.Header().Set("Content-Type","application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "No hay ventas registradas",
			"data":		[]models.Venta{},
		})
		return
	}

	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Ventas obtenidas correctamente",
		"data":		ventas,
	})
}