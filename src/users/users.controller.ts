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
import {RefreshTokenDto} from "./dto/refresh-token.dto";

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
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('getUser')
    async getUser(@Req() req) {
        return this.userService.getUser(req.user.username)
    }

    @Post('signup')
    async registerUser(@Body() body: RegisterUserDto): Promise<User> {
        return this.userService.signUp(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res({passthrough: true}) res: Response) {
        return await this.userService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        return this.userService.logout(req.user.username)
    }


    @Post('refreshToken')
    async refreshToken(
        @Req() req: UserRequest,
        @Body() body: RefreshTokenDto,
    ) {
        const {refreshToken} = body;
        return await this.userService.refreshToken(refreshToken);

    }

    @Post('subscribeProjects')
    @UsePipes(new ValidationPipe({
        transform: true
    }))
    async subscribeProjects(@Body() body: AddProjectsDto): Promise<void> {
        return this.userService.addProject(body)
    }
}
