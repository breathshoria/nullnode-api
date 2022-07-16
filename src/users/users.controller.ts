import {
    Controller,
    Get,
    Post,
    Request,
    Res,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {AddProjectsDto} from "./dto/add-projects.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {User} from '@prisma/client';
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Response} from "express";

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('getUser')
    async getUser(@Request() req) {
        return req.user;
    }

    @Post('signup')
    async registerUser(@Body() body: RegisterUserDto): Promise<User> {
        return this.userService.signUp(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        return this.userService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('refreshToken')
    async refreshToken(@Request() req) {
        return this.userService.refreshToken(req.user.username)
    }

    @Post('subscribeProjects')
    @UsePipes(new ValidationPipe({
        transform: true
    }))
    async subscribeProjects(@Body() body: AddProjectsDto): Promise<void> {
        return this.userService.addProject(body)
    }
}
