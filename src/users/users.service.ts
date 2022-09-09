import {Injectable, NotFoundException, Inject, forwardRef} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {User} from '@prisma/client';
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
        return this.prisma.user.findUnique({
            where: {username},
            include: {projects: true}
        })
    }

    async getUserByToken(refreshToken: string): Promise<User> {
        return this.prisma.user.findUnique({where: {refreshToken}})
    }

    async signUp(body: RegisterUserDto): Promise<User> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(body.password, saltRounds)
        return this.prisma.user.create({
            data: {
                username: body.username,
                password: hash,
                email: body.email,
                roles: ['default']
            }
        })
    }

    async login(user: User): Promise<any> {
        return this.authService.login(user)
    }

    async logout(username: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                username
            },
            data: {
                refreshToken: null
            }
        })
    }

    async addProject(userId: number, body: AddProjectsDto): Promise<void> {
        try {
            await this.prisma.user.update({
                where: {id: userId},
                data: {
                    projects: {
                        connect: body.projectsId
                    }
                }

            });
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async refreshToken(refreshToken: string) {
        return this.authService.refreshToken(refreshToken)
    }

    async addRefreshToken(username: string, refreshToken: string): Promise<void> {
        try {
            await this.prisma.user.update({
                where: {username: username},
                data: {
                    refreshToken
                }
            })
        } catch (e) {
            throw new NotFoundException();
        }
    }
}
