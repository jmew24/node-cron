/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "player_identifier_key" ON "player"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "team_identifier_key" ON "team"("identifier");
