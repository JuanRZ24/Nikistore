package routes

import (
	"net/http"
	"Nikistore/api/handlers"
)


func RegisterRoutes(mux *http.ServeMux) {
	//Categorias
	mux.HandleFunc("/categorias",handlers.CategoriaHandler)
}
