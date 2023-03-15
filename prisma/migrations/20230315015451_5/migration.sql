/*
  Warnings:

  - You are about to drop the column `cart_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `stock_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_cart_id_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_stock_id_fkey`;

-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `order_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `cart_id`,
    DROP COLUMN `product_id`,
    DROP COLUMN `stock_id`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
