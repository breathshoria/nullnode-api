import {Injectable, NotFoundException, Request, UseGuards, Inject, forwardRef} from '@nestjs/common';
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {PrismaService} from "../prisma.service";
import {User, Project, Prisma} from '@prisma/client';
import {UpdateUserDto} from "./dto/update-user.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {AddProjectsDto} from "./dto/add-projects.dto";
import * as bcrypt from 'bcrypt';
import {AuthService} from "../auth/auth.service";


@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) {
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async getUser(username: string): Promise<User> {
        return this.prisma.user.findUnique({where: {username}})
    }

    async signUp(body: RegisterUserDto): Promise<User> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(body.password, saltRounds)
        return this.prisma.user.create({
            data: {
                username: body.username,
                password: hash,
                email: body.email,
            }
        })
    }


    async login(user: User) {
        return this.authService.login(user)
    }

    async addProject(body: AddProjectsDto): Promise<void> {
        try {
            await this.prisma.user.update({
                where: {email: body.email},
                data: {
                    projects: {
                        connect: body.projectsId
                    }
                }

            });
        } catch (e) {
            throw e;
        }
    }


}
