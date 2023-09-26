import { ModuleMetadata } from '@nestjs/common';

export interface IHhOptions {
	token: string;
}

export interface IHhModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<IHhOptions> | IHhOptions;
	inject?: any[];
}
