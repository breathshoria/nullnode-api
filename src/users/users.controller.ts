import {
    Controller,
    Get,
    Post,
    HttpCode,
    Param,
    Body,
    UsePipes,
    ValidationPipe,
    Delete, ParseArrayPipe
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {AddProjectsDto} from "./dto/add-projects.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {User} from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post('signup')
    async registerUser(@Body() body: RegisterUserDto): Promise<User> {
        return this.userService.signUp(body)
    }

    @Post('subscribeProjects')
    @UsePipes(new ValidationPipe({
        transform: true
    }))
    async subscribeProjects(@Body() body: AddProjectsDto): Promise<void> {
        return this.userService.addProject(body)
    }
}
