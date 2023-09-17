import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewSevice: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewSevice.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewSevice.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete('byProduct/:productId')
	async deleteByProduct(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewSevice.deleteByProductId(productId);
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewSevice.findByProductId(productId);
	}
}
