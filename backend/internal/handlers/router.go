package handlers

import (
	"backend-service/internal/services"
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
		Max:        10,
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

			groupId := groups.Group("/:id")
			{
				//groupId.Get("/", h.getGroup)

				races := groupId.Group("/races")
				{
					races.Post("/", h.newRace)
				}
			}
		}

		// Upgraded websocket request
		//api.Get("/screens/:id/content", websocket.New(func(c *websocket.Conn) {
		//	fmt.Println(c.Locals("Host")) // "Localhost:3000"
		//	for {
		//		mt, msg, err := c.ReadMessage()
		//		if err != nil {
		//			h.log.Error().Msgf("read error: %v", err)
		//			break
		//		}
		//		h.log.Debug().Msgf("recv: %s", msg)
		//		err = c.WriteMessage(mt, msg)
		//		if err != nil {
		//			h.log.Error().Msgf("write error: %v", err)
		//			break
		//		}
		//	}
		//}))

	}

	h.log.Info().Msg("Starting server on port " + port)
	err := app.Listen(":" + port)
	if err != nil {
		h.log.Error().Msg(err.Error())
	}
}
