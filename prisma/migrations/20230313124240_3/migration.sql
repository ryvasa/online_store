/*
  Warnings:

  - You are about to alter the column `refresh_token` on the `User` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `Text`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `refresh_token` TEXT NULL;
