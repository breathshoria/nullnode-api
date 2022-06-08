import {Controller, Get, Post, Req, Res, HttpCode, Redirect, Param, Body, UsePipes, ValidationPipe} from "@nestjs/common";
import {ProjectsService} from "./projects.service";
import {AddProjectDto} from "./dto/add-project.dto";
import { Request, Response } from 'express';
import {Project} from "./entities/project.entity";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    async getProjects(): Promise<Project[]> {
        return this.projectsService.getProjects();
    }
    @Get('getProject/:id')
    async getProject(@Param('id') id): Promise<Project> {
        return this.projectsService.getProject(id);
    }

    @Post('addProject')
    @UsePipes(new ValidationPipe({
        transform: true,
    }))
    async addProject(@Body() addProjectDto: AddProjectDto): Promise<Project> {
        return this.projectsService.addProject(addProjectDto)
    }
}