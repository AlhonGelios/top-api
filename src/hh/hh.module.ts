import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HhService } from './hh.service';
import { IHhModuleAsyncOptions } from './hh.interface';
import { HH_MODULE_OPTIONS } from './hh.constants';

@Module({
	imports: [HttpModule],
})
export class HhModule {
	static forRootAsync(options: IHhModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvaider(options);
		return {
			module: HhModule,
			imports: options.imports,
			providers: [HhService, asyncOptions],
			exports: [HhService],
		};
	}

	private static createAsyncOptionsProvaider(options: IHhModuleAsyncOptions): Provider {
		return {
			provide: HH_MODULE_OPTIONS,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},

			inject: options.inject || [],
		};
	}
}
