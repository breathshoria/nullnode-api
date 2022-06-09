import {Injectable, Inject} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.config.get<string>('database.host'),
            port: this.config.get<number>('database.port'),
            database: this.config.get<string>('database.name'),
            username: this.config.get<string>('database.user'),
            password: this.config.get<string>('database.password'),
            autoLoadEntities:  true,
            synchronize: true,
        };
    }
}