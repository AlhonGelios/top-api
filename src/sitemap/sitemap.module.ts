import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { ConfigModule } from '@nestjs/config';
import { TopPageModule } from 'src/top-page/top-page.module';

@Module({
	imports: [TopPageModule, ConfigModule],
	controllers: [SitemapController],
})
export class SitemapModule {}
