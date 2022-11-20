-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_team_id_fkey";

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "source" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
