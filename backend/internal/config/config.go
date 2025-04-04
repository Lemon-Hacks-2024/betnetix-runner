package config

import (
	"fmt"
	"os"
)

type Config struct {
	AppPort   string
	AppApiKey string
	AppSecret string
	Postgres  Postgres
}

type Postgres struct {
	DBHost    string
	DBPort    string
	DBUser    string
	DBName    string
	DBPass    string
	DBSSLMode string
}

func GetConfig() Config {
	// APP
	appPort := os.Getenv("APP_PORT")
	if appPort == "" {
		appPort = "8080"
		fmt.Println("APP_PORT environment variable is not set. Using default value: 8080")
	}

	appApiKey := os.Getenv("APP_API_KEY")
	if appApiKey == "" {
		appApiKey = ""
		fmt.Println("APP_API_KEY environment variable is not set. Using default value: ''")
	}

	appSecret := os.Getenv("APP_SECRET_KEY")
	if appSecret == "" {
		appSecret = "secret"
		fmt.Println("APP_SECRET_KEY environment variable is not set. Using default value: secret")
	}

	// Postgres
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
		fmt.Println("DB_HOST environment variable is not set. Using default value: localhost")
	}

	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
		fmt.Println("DB_PORT environment variable is not set. Using default value: 5432")
	}

	dbUser := os.Getenv("DB_USER")
	if dbUser == "" {
		dbUser = "postgres"
		fmt.Println("DB_USER environment variable is not set. Using default value: postgres")
	}

	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "postgres"
		fmt.Println("DB_NAME environment variable is not set. Using default value: postgres")
	}

	dbPass := os.Getenv("DB_PASS")
	if dbPass == "" {
		dbPass = "password"
		fmt.Println("DB_PASS environment variable is not set. Using default value: password")
	}

	dbSSLMode := os.Getenv("DBSSL_MODE")
	if dbSSLMode == "" {
		dbSSLMode = "disable"
		fmt.Println("DBSSL_MODE environment variable is not set. Using default value: disable")
	}

	return Config{
		AppPort:   appPort,
		AppApiKey: appApiKey,
		AppSecret: appSecret,
		Postgres: Postgres{
			DBHost:    dbHost,
			DBPort:    dbPort,
			DBUser:    dbUser,
			DBName:    dbName,
			DBPass:    dbPass,
			DBSSLMode: dbSSLMode,
		},
	}
}
