package handlers


import (
	"encoding/json"
	"net/http"
	"Nikistore/config"
	"Nikistore/api/models"
)


func CompraHandler(w http.ResponseWriter, r *http.Request){
	switch r.Method{
	case http.MethodPost:
		crearCompra(w,r)
	case http.MethodGet:
		obtenerCompras(w,r)
	default:
		
		}
}


func obtenerCompras(w http.ResponseWriter, r *http.Request){
	var compras [] models.Compra

	result := config.DB.Find(&compras)

	if result.Error != nil {
		http.Error(w, "Error al obtener los productos", http.StatusInternalServerError)
		return
	}

	if len(compras) == 0 {
		w.Header().Set("Content-Type","application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "No hay productos registrados",
			"data": []models.Compra{},

		})
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(compras)

}



func crearCompra(w http.ResponseWriter, r *http.Request){
	var compra models.Compra

	if err := json.NewDecoder(r.Body).Decode(&compra); err != nil {
		http.Error(w, "Error al decodificar el json", http.StatusBadRequest)
		return
	}

	tx := config.DB.Begin()


	if err := tx.Create(&compra).Error; err != nil {
		tx.Rollback()
		return
	}

	for i := range compra.CompraItems{
		compra.CompraItems[i].ID = 0
		compra.CompraItems[i].CompraID = compra.ID
		if err := tx.Create(&compra.CompraItems[i]).Error; err != nil {
			tx.Rollback()
			return
		}
		
		var producto models.Producto
		result := tx.First(&producto, compra.CompraItems[i].Producto.ID)

		if result.Error != nil{
			if err := tx.Create(&producto).Error; err != nil {
				tx.Rollback()
				return
			}

		}else{ 
			producto.Stock += int(compra.CompraItems[i].Cantidad)
			if err := tx.Save(&producto).Error; err != nil {
				tx.Rollback()
				return
			}

		}

		

	}
	tx.Commit()
}




