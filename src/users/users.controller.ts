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
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {Response} from "express";

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post('signup')
    async registerUser(@Body() body: RegisterUserDto): Promise<User> {
        return this.userService.signUp(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        const {accessToken} = await this.userService.login(req.user);
        res.cookie('accessToken', accessToken)
    }

    @Post('refreshToken')
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this.userService.refreshToken(body)
    }

    @Post('subscribeProjects')
    @UsePipes(new ValidationPipe({
        transform: true
    }))
    async subscribeProjects(@Body() body: AddProjectsDto): Promise<void> {
        return this.userService.addProject(body)
    }
}
