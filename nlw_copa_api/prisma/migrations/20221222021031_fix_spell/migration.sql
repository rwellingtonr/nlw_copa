/*
  Warnings:

  - You are about to drop the column `firstTeamCoutryCode` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamCoutryCode` on the `games` table. All the data in the column will be lost.
  - Added the required column `firstTeamCountryCode` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondTeamCountryCode` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "firstTeamCoutryCode",
DROP COLUMN "secondTeamCoutryCode",
ADD COLUMN     "firstTeamCountryCode" VARCHAR(2) NOT NULL,
ADD COLUMN     "secondTeamCountryCode" VARCHAR(2) NOT NULL;
