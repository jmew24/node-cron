/*
  Warnings:

  - Added the required column `number` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "player" ADD COLUMN     "number" TEXT NOT NULL;
