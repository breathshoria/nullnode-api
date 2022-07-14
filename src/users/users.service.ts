import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {User, Project, Prisma} from '@prisma/client';
import {UpdateUserDto} from "./dto/update-user.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {AddProjectsDto} from "./dto/add-projects.dto";


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async getUser(email: string): Promise<User> {
        return this.prisma.user.findUnique({where: {email}})
    }

    async signUp(body: RegisterUserDto): Promise<User> {
        return this.prisma.user.create({data: body})
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
