/*
  Warnings:

  - You are about to drop the column `detail` on the `Category_preview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category_preview` DROP COLUMN `detail`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `stock_id` VARCHAR(191) NOT NULL,
    `cart_id` VARCHAR(191) NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `totalQuantity` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `country` TEXT NOT NULL,
    `city` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `status` VARCHAR(191) NULL DEFAULT 'proccess',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stock`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
