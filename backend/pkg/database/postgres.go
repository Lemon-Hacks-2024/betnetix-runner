package database

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type PostgresDB struct {
	DB *sqlx.DB
}

// NewPostgresDB создает новое подключение к базе данных PostgreSQL и возвращает структуру PostgresDB
func NewPostgresDB(DBHost, DBPort, DBUser, DBName, DBPass, DBSSLMode string) (*PostgresDB, error) {
	connStr := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		DBHost, DBPort, DBUser, DBName, DBPass, DBSSLMode)

	db, err := sqlx.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	// Проверка соединения
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	// Создание пула соединений
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	return &PostgresDB{
		DB: db,
	}, nil
}
