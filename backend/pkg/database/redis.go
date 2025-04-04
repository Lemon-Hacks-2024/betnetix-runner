package database

import (
	"github.com/go-redis/redis"
)

type Redis struct {
	Client *redis.Client
}

func NewRedis(address, password string, db int) (*Redis, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     address,
		Password: password,
		DB:       db,
	})
	if err := client.Ping().Err(); err != nil {
		return nil, err
	}
	return &Redis{
		Client: client,
	}, nil
}
