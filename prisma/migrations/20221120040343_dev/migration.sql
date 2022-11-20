-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "full_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "sport" TEXT NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "sport" TEXT NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_id_key" ON "team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "team_identifier_key" ON "team"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "player_id_key" ON "player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "player_identifier_key" ON "player"("identifier");

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
