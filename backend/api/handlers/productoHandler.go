package handlers


import (
	"encoding/json"
	"net/http"
	"Nikistore/config"
	"Nikistore/api/models"
	"strings"
	"strconv"
)

func ProductoHandler(w http.ResponseWriter, r *http.Request){
	switch r.Method{
	case http.MethodPost:
		crearProducto(w,r)
	case http.MethodGet:
		listarProductos(w,r)
	case http.MethodDelete:
		eliminarProducto(w,r)
	default:
		http.Error(w,"Metodo no permitido", http.StatusMethodNotAllowed)
	}
}



func crearProducto(w http.ResponseWriter, r *http.Request){
	var producto models.Producto


	if err := json.NewDecoder(r.Body).Decode(&producto); err != nil{
		http.Error(w, "JSON invalid", http.StatusBadRequest)
		return
	}

	if err := config.DB.Create(&producto).Error; err != nil {
		http.Error(w, "Error al guardar en base de datos", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Producto creado con exito",
		"data":	producto,
	})
}


func listarProductos(w http.ResponseWriter, r *http.Request){
	var productos []models.Producto


	result := config.DB.Preload("Categoria").
	Find(&productos)

	if result.Error != nil {
		http.Error(w, "Error al obtener los productos", http.StatusInternalServerError)
		return
	}

	if len(productos) == 0 {
		w.Header().Set("Content-Type","application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "No hay productos registrados",
			"data": []models.Producto{},

		})
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(productos)
}


func eliminarProducto(w http.ResponseWriter, r *http.Request){
	var producto models.Producto

	parts := strings.Split(r.URL.Path,"/")

	if len(parts) < 3 {
		http.Error(w, "Falta el ID en la ruta", http.StatusBadRequest)
		return
	}

	idStr := parts[2]
	id, err := strconv.Atoi(idStr)

	if err != nil {
		http.Error(w,"ID invalido", http.StatusBadRequest)
		return
	}

	result := config.DB.First(&producto, id)
	if result.Error != nil {
		http.Error(w,"No se encontro la producto", http.StatusNotFound)
		return
	}

	if err := config.DB.Delete(&producto).Error; err != nil{
		http.Error(w, "Error al eliminar la producto", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "producto eliminado",
		"data": id, 
	})



}


