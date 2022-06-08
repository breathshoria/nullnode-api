import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Project} from "./entities/project.entity";
import {Repository, DataSource} from 'typeorm';
import {AddProjectDto} from "./dto/add-project.dto";

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

    async getProject(id: number): Promise<Project> {
        return this.projectsRepository.findOne({where: {id: id}})
    }

    async addProject(body: AddProjectDto): Promise<Project> {
        return this.projectsRepository.save(body)
    }
}
