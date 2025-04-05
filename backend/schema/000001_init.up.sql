
CREATE TABLE IF NOT EXISTS groups
(
    id         UUID         NOT NULL DEFAULT gen_random_uuid(),
    name       VARCHAR(100) NOT NULL,
    players    JSONB        NOT NULL,
    created_at BIGINT       NOT NULL,
    deleted_at BIGINT       NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS races
(
    id          UUID   NOT NULL DEFAULT gen_random_uuid(),
    group_id    UUID   NOT NULL,
    results     JSONB  NOT NULL,
    started_at  BIGINT NOT NULL,
    finished_at BIGINT,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS races;