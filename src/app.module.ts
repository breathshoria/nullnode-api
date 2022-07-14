import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProjectsModule} from "./projects/projects.module";
import {ConfigModule} from '@nestjs/config';
import configuration from "./config/configuration";
import { UsersModule } from './users/users.module';

const env = process.env.NODE_ENV

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            envFilePath: env === 'prod' ? '.env' : `.env.${env}`
        }),
        ProjectsModule,
        UsersModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}