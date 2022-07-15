import {
    Controller,
    Get,
    Post,
    HttpCode,
    Param,
    Request,
    Body,
    UsePipes,
    ValidationPipe,
    Delete, ParseArrayPipe, UseGuards
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {AddProjectsDto} from "./dto/add-projects.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {User} from '@prisma/client';
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

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
    async login(@Request() req) {
        return this.userService.login(req.user)
    }

    @Post('subscribeProjects')
    @UsePipes(new ValidationPipe({
        transform: true
    }))
    async subscribeProjects(@Body() body: AddProjectsDto): Promise<void> {
        return this.userService.addProject(body)
    }
}
