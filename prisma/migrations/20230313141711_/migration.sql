/*
  Warnings:

  - You are about to drop the column `color` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_product_id_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `color`,
    DROP COLUMN `product_id`,
    DROP COLUMN `size`,
    DROP COLUMN `stock`,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `stock_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_uuid_key` ON `Cart`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Stock_uuid_key` ON `Stock`(`uuid`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stock`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
