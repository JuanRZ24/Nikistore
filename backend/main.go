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
	)

	//registro de rutas

	//router nativo de go
	mux := http.NewServeMux()
	routes.RegisterRoutes(mux)

	if err != nil {
		panic(err)
	}

	fmt.Println("Migraciones Ejecutadas correctamente")
	http.ListenAndServe(":8080", mux)
}