import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { subDays, format } from 'date-fns';
import { TopPageService } from 'src/top-page/top-page.service';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {
	domain: string;

	constructor(
		private readonly topPageService: TopPageService,
		private readonly configService: ConfigService,
	) {
		this.domain = this.configService.get('DOMAIN') && '';
	}

	@Get('xml')
	@Header('content-type', 'text/xml')
	async sitemap() {
		const fomatString = 'yyyy-MM-dd"T"HH:mm:00.00xxx';
		let res = [
			{
				loc: this.domain,
				lastmod: format(subDays(new Date(), 1), fomatString),
				changefreq: 'daily',
				priority: '1.0',
			},
			{
				loc: `${this.domain}/courses`,
				lastmod: format(subDays(new Date(), 1), fomatString),
				changefreq: 'daily',
				priority: '1.0',
			},
		];

		const pages = await this.topPageService.findAll();
		res = res.concat(
			pages.map((page) => {
				let updatedAt: Date = new Date();

				if (page.updatedAt && typeof page.updatedAt != 'boolean') {
					updatedAt = new Date(page.updatedAt);
				}

				return {
					loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
					lastmod: format(updatedAt, fomatString),
					changefreq: 'weekly',
					priority: '0.7',
				};
			}),
		);
		const builder = new Builder({
			xmldec: { version: '1.0', encoding: 'UTF-8' },
		});
		return builder.buildObject({
			urlset: {
				$: {
					xmlns: 'http://www.sitemaps.org/shemas/sitemap/0.9',
				},
				url: res,
			},
		});
	}
}
