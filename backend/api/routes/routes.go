package routes

import (
	"net/http"
	"Nikistore/api/handlers"
)


func RegisterRoutes(mux *http.ServeMux) {
	//Categorias
	mux.HandleFunc("/categorias",handlers.CategoriaHandler)
	mux.HandleFunc("/categorias/", handlers.CategoriaHandler)

	mux.HandleFunc("/producto", handlers.ProductoHandler)
	mux.HandleFunc("/producto/", handlers.ProductoHandler)


	mux.HandleFunc("/venta", handlers.VentaHandler)
	mux.HandleFunc("/venta/", handlers.VentaHandler)
}
