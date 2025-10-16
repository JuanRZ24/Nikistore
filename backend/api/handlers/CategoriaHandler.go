package handlers


import (
	"encoding/json"
	"net/http"
	"Nikistore/config"
	"Nikistore/api/models"
)

func CategoriaHandler(w http.ResponseWriter, r *http.Request){
	switch r.Method {
	case http.MethodPost:
		crearCategoria(w,r)
	case http.MethodGet:
		obtenerCategorias(w,r)
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