import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { TopPageService } from 'src/top-page/top-page.service';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [TopPageService, ConfigService],
	controllers: [SitemapController],
})
export class SitemapModule {}
