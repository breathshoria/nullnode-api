import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {RegisterUserDto} from "./dto/register-user.dto";
import {INestApplication} from "@nestjs/common";
import {AppModule} from "../app.module";
import * as request from "supertest";


describe('UsersController', () => {
    let app: INestApplication;
    let userController: UsersController;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        userController = app.get(UsersController);
        await app.init();
    });

    const user: RegisterUserDto = {
        username: 'Pete',
        email: 'a@a7.ru',
        password: 'password'
    }

    let accessToken: string;

    it('/POST signup', () => {
        return request(app.getHttpServer())
            .post('/users/signup')
            .send(user)
            .expect(201)
    });

    it('/POST login', async () => {
        const response = await request(app.getHttpServer())
            .post('/users/login')
            .send({username: user.username, password: user.password})
        expect(response.status).toEqual(201);
        accessToken = response.body.accessToken;
    })

    it('/GET getUser', async () => {
        const response = await request(app.getHttpServer())
            .get('/users/getUser')
            .set('Authorization', `bearer ${accessToken}`)
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(user.username);
    })

    afterAll(async () => {
        await app.close();
    });
});
