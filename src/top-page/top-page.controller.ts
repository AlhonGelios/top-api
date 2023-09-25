import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	NotFoundException,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { NOT_FOUND_TOP_PAGE } from './top-page.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getById(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id);

		if (!page) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}

		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPageService.findByAlias(alias);

		if (!page) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}

		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletePage = await this.topPageService.deleteById(id);

		if (!deletePage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatePage = await this.topPageService.updateById(id, dto);

		if (!updatePage) {
			throw new NotFoundException(NOT_FOUND_TOP_PAGE);
		}

		return updatePage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async findByCategory(@Body() dto: FindTopPageDto) {
		return await this.topPageService.findByCategory(dto.firstCategory);
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return await this.topPageService.findByText(text);
	}
}
