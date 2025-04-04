package app

import (
	"backend-service/internal/config"
	"backend-service/internal/handlers"
	"backend-service/pkg/database"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog"
	"os"
)

func Run() {
	// logger
	output := zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: "2006-01-02 15:04:05"}
	logger := zerolog.New(output).With().Caller().Timestamp().Logger()
	dir, err := os.Getwd()
	if err != nil {
		logger.Error().Msg("Cannot get working directory")
	}
	logger.Info().Msg("Current working directory: " + dir)
	// init env
	err = godotenv.Load()
	if err != nil {
		logger.Error().Msgf("Error loading .env file: %v", err)
	}
	// cfg
	cfg := config.GetConfig()
	// postgres
	_, err = database.NewPostgresDB(cfg.Postgres.DBHost, cfg.Postgres.DBPort, cfg.Postgres.DBUser, cfg.Postgres.DBName, cfg.Postgres.DBPass, cfg.Postgres.DBSSLMode)
	if err != nil {
		logger.Fatal().Msg(err.Error())
	}
	logger.Info().Msg("Postgres: OK")
	// storages

	// services

	// handlers
	handler := handlers.NewHandler(logger)
	// run
	handler.InitRoutes(cfg.AppPort)
}
