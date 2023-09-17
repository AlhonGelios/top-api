import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductModel, ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }])],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
