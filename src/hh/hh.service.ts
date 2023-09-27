import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { API_URL, CLUSTER_FIND_ERROR, HH_MODULE_OPTIONS, SALARY_CLUSTER_ID } from './hh.constants';
import { HhResponse } from './hh.models';
import { HhData } from '../top-page/top-page.model';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IHhOptions } from './hh.interface';

@Injectable()
export class HhService {
	private readonly logger = new Logger(HhService.name);
	private token: string;

	constructor(
		private readonly httpService: HttpService,
		@Inject(HH_MODULE_OPTIONS) options: IHhOptions,
	) {
		this.token = options.token;
	}

	async getData(text: string) {
		const { data } = await firstValueFrom(
			this.httpService
				.get<HhResponse>(API_URL.vacancies, {
					params: {
						text,
						clusters: true,
					},
					headers: {
						'User-Agent': 'top-it-prof/1.0',
						Authorization: 'Bearer ' + this.token,
					},
				})
				.pipe(
					catchError((error: AxiosError) => {
						this.logger.error(error.response?.data);
						throw 'Произошла ошибка!';
					}),
				),
		);
		return this.parseData(data);
	}

	private parseData(data: HhResponse): HhData {
		const salaryCluster = data.clusters.find((c) => c.id == SALARY_CLUSTER_ID);

		if (!salaryCluster) {
			throw new Error(CLUSTER_FIND_ERROR);
		}

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
		const middleSalary = this.getSalaryFromString(
			salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
		);
		const seniorSalary = this.getSalaryFromString(
			salaryCluster.items[salaryCluster.items.length - 1].name,
		);

		return {
			count: data.found,
			juniorSalary,
			middleSalary,
			seniorSalary,
			updatedAt: new Date(),
		};
	}

	private getSalaryFromString(s: string): number {
		const numberRegExp = /(\d+)/g;
		const res = s.match(numberRegExp);

		if (!res) {
			return 0;
		}

		return Number(res[0]);
	}
}
