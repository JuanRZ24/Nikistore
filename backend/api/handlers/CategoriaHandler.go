package handlers


import (
	"encoding/json"
	"net/http"
	"Nikistore/config"
	"Nikistore/api/models"
	"strings"
	"strconv"
)

func CategoriaHandler(w http.ResponseWriter, r *http.Request){
	switch r.Method {
	case http.MethodPost:
		crearCategoria(w,r)
	case http.MethodGet:
		obtenerCategorias(w,r)
	case http.MethodDelete:
		eliminarCategorias(w,r)
	default:
		http.Error(w,"Metodo no permitido",http.StatusMethodNotAllowed)
	}

}

func crearCategoria(w http.ResponseWriter, r *http.Request){
	var categoria models.Categoria

	if err := json.NewDecoder(r.Body).Decode(&categoria); err != nil{
		http.Error(w, "JSON invalido", http.StatusBadRequest)
		return
	}

	if err := config.DB.Create(&categoria).Error; err != nil{
		http.Error(w, "Error al guardar en base de datos",http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Categoria creada con exito",
		"data": categoria,
	})
}

func obtenerCategorias(w http.ResponseWriter, r *http.Request){
	var categorias []models.Categoria


	result := config.DB.Find(&categorias)
	if result.Error != nil {
		http.Error(w, "Error al obtener categorias", http.StatusInternalServerError)
		return
	}

	if len(categorias) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "No hay categorias registradas",
			"data":		[]models.Categoria{},
		})
		return
	}


	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Categorias obtenidas correctamente",
		"data": categorias, 
	})

}


func eliminarCategorias(w http.ResponseWriter, r *http.Request){
	var categoria models.Categoria


	parts := strings.Split(r.URL.Path, "/")

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

	result := config.DB.First(&categoria, id)
	if result.Error != nil {
		http.Error(w,"No se encontro la categoria", http.StatusNotFound)
		return
	}

	if err := config.DB.Delete(&categoria).Error; err != nil{
		http.Error(w, "Error al eliminar la categoria", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Categoria eliminada",
		"data": id, 
	})


	
}