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