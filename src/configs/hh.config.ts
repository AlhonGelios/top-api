import { ConfigService } from '@nestjs/config';
import { IHhOptions } from '../hh/hh.interface';

export const getHhConfig = (configService: ConfigService): IHhOptions => {
	const token = configService.get('HH_TOKEN');
	if (!token) {
		throw new Error('HH_TOKEN не задан');
	}
	return {
		token,
	};
};
