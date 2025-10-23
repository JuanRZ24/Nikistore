package main

import (
	"fmt"
	"net/http"
	"Nikistore/api/routes"
	"Nikistore/config"
	"Nikistore/api/models"
)


func main(){

	config.ConnectDB()

	err := config.DB.AutoMigrate(
		&models.Categoria{},
        &models.Producto{},
        &models.Venta{},
        &models.VentaItem{},
        &models.MovimientoStock{},
        &models.Ingreso{},
        &models.Gasto{},
        &models.Presupuesto{},
		&models.Compra{},
		&models.CompraItem{},
	)

	//registro de rutas

	//router nativo de go
	mux := http.NewServeMux()
	routes.RegisterRoutes(mux)

	handler := enableCORS(mux)


	if err != nil {
		panic(err)
	}

	fmt.Println("Migraciones Ejecutadas correctamente")
	http.ListenAndServe(":8080", handler)
}


// 🧩 Middleware CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 🔹 Permitir que cualquier origen acceda (puedes restringirlo después)
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// 🔹 Métodos permitidos
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// 🔹 Cabeceras permitidas
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// 🔹 Manejar las solicitudes preflight (OPTIONS)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pasar al siguiente handler
		next.ServeHTTP(w, r)
	})
}