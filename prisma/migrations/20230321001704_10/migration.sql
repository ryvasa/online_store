-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_product_id_fkey`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
