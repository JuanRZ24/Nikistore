package config

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)


var DB *gorm.DB


func ConnectDB(){
	var err error

	DB, err = gorm.Open(sqlite.Open("Nikistore.db"), &gorm.Config{})
	if err != nil {
		panic("Error al conectar con la DB")
	}

	fmt.Println("Conexion exitosa")
}