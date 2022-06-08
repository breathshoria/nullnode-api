import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProjectsModule} from "./projects/projects.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import configuration from "./config/configuration";
import {TypeOrmConfigService} from './config/db.service';


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
        ProjectsModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
