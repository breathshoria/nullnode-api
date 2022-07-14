import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Project, Prisma} from '@prisma/client';
import {UpdateProjectDto} from "./dto/update-project.dto";
import {AddProjectDto} from "./dto/add-project.dto";


@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {
    }

    async getProjects(): Promise<Project[]> {
        return this.prisma.project.findMany()
    }

    async getProject(id: number): Promise<Project> {
        const project = await this.prisma.project.findUnique({
            where: {
                id: id
            }
        })
        if (!project) {
            throw new NotFoundException()
        }
        return project;
    }

    async addProject(body: AddProjectDto): Promise<Project> {
        return this.prisma.project.create({data: body})
    }

    async updateProject(body: UpdateProjectDto): Promise<void> {
        await this.prisma.project.update({
            where: {id: body.id},
            data: body
        })
    }

    async deleteProject(id: number): Promise<void> {
        try {
            await this.prisma.project.delete({where: {id}})
        } catch {
            throw new NotFoundException()
        }
    }
}
