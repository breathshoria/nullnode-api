import {
    Controller,
    Get,
    Post,
    Res,
    Req,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards, Headers
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {AddProjectsDto} from "./dto/add-projects.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {User} from '@prisma/client';
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Response, Request} from "express";

interface UserRequest extends Request {
    user: {
        username: string;
        userId: number;
    }
    cookies: {
        refreshToken: string;
    }
}

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('getUser')
    async getUser(@Req() req) {
        return req.user;
    }

    @Post('signup')
    async registerUser(@Body() body: RegisterUserDto): Promise<User> {
        return this.userService.signUp(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res({ passthrough: true }) res: Response) {
        const {refreshToken, ...result} = await this.userService.login(req.user);
        res.cookie('refreshToken', refreshToken);
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        return this.userService.logout(req.user.username)
    }


    @Get('refreshToken')
    async refreshToken(@Req() req: UserRequest, @Headers('Authorization') headers) {
        const accessToken = headers.split(' ')[1]
        return this.userService.refreshToken(accessToken, req.cookies.refreshToken)
    }

    @Post('subscribeProjects')
    @UsePipes(new ValidationPipe({
        transform: true
    }))
    async subscribeProjects(@Body() body: AddProjectsDto): Promise<void> {
        return this.userService.addProject(body)
    }
}
