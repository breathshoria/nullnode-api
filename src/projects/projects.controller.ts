import {
    Controller,
    Get,
    Post,
    HttpCode,
    Param,
    Body,
    UsePipes,
    ValidationPipe,
    Delete
} from "@nestjs/common";
import {ProjectsService} from "./projects.service";
import {AddProjectDto} from "./dto/add-project.dto";
import {UpdateProjectDto} from "./dto/update-project.dto"
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
    async addProject(@Body() addProjectDto: AddProjectDto): Promise<void> {
        await this.projectsService.addProject(addProjectDto)
    }

    @Post('updateProject')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({
        transform: true,
    }))
    async updateProject(@Body() updateProjectDto: UpdateProjectDto): Promise<void> {
        await this.projectsService.updateProject(updateProjectDto)
    }

    @Delete('deleteProject/:id')
    async deleteProject(@Param('id') id): Promise<void> {
        await this.projectsService.deleteProject(id)
    }
}