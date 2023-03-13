/*
  Warnings:

  - You are about to drop the column `stock_id` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_stock_id_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `stock_id`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `stock` JSON NOT NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
