/*
  Warnings:

  - You are about to drop the column `button` on the `Category_preview` table. All the data in the column will be lost.
  - You are about to drop the column `button` on the `Slide` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category_preview` DROP COLUMN `button`;

-- AlterTable
ALTER TABLE `Slide` DROP COLUMN `button`;
