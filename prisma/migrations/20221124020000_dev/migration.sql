/*
  Warnings:

  - You are about to drop the column `logo_url` on the `player` table. All the data in the column will be lost.
  - You are about to drop the `Sport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `headshot_url` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_sport_id_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_sport_id_fkey";

-- AlterTable
ALTER TABLE "player" DROP COLUMN "logo_url",
ADD COLUMN     "headshot_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Sport";

-- CreateTable
CREATE TABLE "sport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sport_id_key" ON "sport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sport_name_key" ON "sport"("name");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
