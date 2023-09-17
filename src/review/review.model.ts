import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProductModel } from 'src/product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop({ type: Types.ObjectId, ref: 'productmodels' })
	productId: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
