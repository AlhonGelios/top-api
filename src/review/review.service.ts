import { Injectable } from '@nestjs/common';
import { ReviewDocument, ReviewModel } from './review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewDocument>) {}

	async create(dto: CreateReviewDto): Promise<ReviewModel> {
		const productId = new Types.ObjectId(dto.productId);
		return this.reviewModel.create({ ...dto, productId });
	}

	async delete(id: string): Promise<ReviewModel | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewModel[]> {
		return this.reviewModel.find({ productId }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId }).exec();
	}
}
