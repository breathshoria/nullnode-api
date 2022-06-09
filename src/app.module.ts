import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProjectsModule} from "./projects/projects.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import configuration from "./config/configuration";
import {TypeOrmConfigService} from './config/db.service';

const env = process.env.NODE_ENV

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            envFilePath: env === 'prod' ? '.env' : `.env.${env}`
        }),
        TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
        ProjectsModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
