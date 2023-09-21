import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageSchema } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'TopPage', schema: TopPageSchema }])],
	controllers: [TopPageController],
	providers: [TopPageService],
})
export class TopPageModule {}
