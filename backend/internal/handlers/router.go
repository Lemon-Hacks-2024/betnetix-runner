package handlers

import (
	"backend-service/internal/services"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/rs/zerolog"
	"time"
)

type Handler struct {
	log      zerolog.Logger
	services *services.Service
}

func NewHandler(
	log zerolog.Logger,
	services *services.Service,
) *Handler {
	return &Handler{
		log:      log,
		services: services,
	}
}

func (h *Handler) InitRoutes(port string) {
	app := fiber.New(fiber.Config{
		DisableDefaultContentType: true,
		CaseSensitive:             false,
	})

	app.Use(cors.New())

	// 3 requests per 10 seconds max
	app.Use(limiter.New(limiter.Config{
		Expiration: 1 * time.Second,
		Max:        20,
	}))

	api := app.Group("/api-hack/v1")
	{
		api.Get("/", func(ctx *fiber.Ctx) error {
			return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"message": "ok"})
		})

		groups := api.Group("/groups")
		{
			groups.Post("/", h.createGroup)
			groups.Get("/", h.getGroups)
			groups.Get("/players/random", h.generateRandomPlayers)

			groupId := groups.Group("/:id")
			{
				groupId.Get("/", h.getGroup)
				groupId.Patch("/players", h.updateGroupPlayers)

				races := groupId.Group("/races")
				{
					races.Post("/", h.newRace)
					races.Post("/:quantity", h.creatRaces)
				}
				analytics := groupId.Group("/analytics")
				{
					analytics.Get("/places", h.getPlacesProbabilities)
					analytics.Get("/top2", h.getTop2Probabilities)
					analytics.Get("/top3", h.getTop3Probabilities)
					analytics.Get("/pairs", h.getPairsProbabilities)
				}
			}
		}
		streams := api.Group("/streams")
		{
			streams.Get("/race", websocket.New(h.streamRaces))
		}
	}
	h.log.Info().Msg("Starting server on port " + port)
	err := app.Listen(":" + port)
	if err != nil {
		h.log.Error().Msg(err.Error())
	}
}
