import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProjectsModule} from "./projects/projects.module";
import {ConfigModule} from '@nestjs/config';
import configuration from "./config/configuration";
import {UsersModule} from './users/users.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';

@Module({
    imports: [
        ProjectsModule,
        UsersModule,
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}