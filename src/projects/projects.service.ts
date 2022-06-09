import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Project} from "./entities/project.entity";
import {Repository} from 'typeorm';
import {AddProjectDto} from "./dto/add-project.dto";
import {UpdateProjectDto} from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) {
    }

    async getProjects(): Promise<Project[]> {
        return this.projectsRepository.find()
    }

    async getProject(id: string): Promise<Project> {
        return this.projectsRepository.findOne({where: {id : id}})
    }

    async addProject(body: AddProjectDto): Promise<Project> {
        return this.projectsRepository.save(body)
    }

    async updateProject(body: UpdateProjectDto): Promise<void> {
        await this.projectsRepository.update(body.id, body)
    }
    async deleteProject(id: string): Promise<void> {
        await this.projectsRepository.delete(id)
    }
}
