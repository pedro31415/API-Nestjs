import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from '../entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tags.entity';
import { CreateCourseDTO } from './dto/create-courses-dto';
import { UpdateCourseDTO } from './dto/update-courses-dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}
    

     async findAll(){
        return this.courseRepository.find({
            relations: ['tags'],
        })
    }

    async findOne(id: string){
        const course = await this.courseRepository.findOne({
            where: {id: id},
            relations: ['tags'],
        })
        if(!course) {
            throw new HttpException(`Course ID ${id} is not found`, HttpStatus.NOT_FOUND)
        }
        return course
    }

    async create(createCourseDTO: CreateCourseDTO){
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloaodTagByName(name))
        )
        const course = this.courseRepository.create({
            ...createCourseDTO,
            tags,
        })
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDTO: UpdateCourseDTO){
        const tags = updateCourseDTO.tags && (await Promise.all(
            updateCourseDTO.tags.map(name => this.preloaodTagByName(name))
        ))

        const course = await this.courseRepository.preload({
            ...updateCourseDTO,
            id: id,
            tags
        })

        if(!course) {
            throw new HttpException(`Course ID ${id} is not found`, HttpStatus.NOT_FOUND)
        } 
        return this.courseRepository.save(course)
    }


    async remove(id:string){
        const course = await this.courseRepository.findOne({
            where: {
                id: id
            },
        })

        if(!course) {
            throw new HttpException(`Course ID ${id} is not found`, HttpStatus.NOT_FOUND)
        } 
        return this.courseRepository.remove(course)
    }


    private async preloaodTagByName(name: string): Promise<Tag>{
        const tag = await this.tagRepository.findOne({
            where: {
                name: name
            }
        })
        if (tag){
            return tag
        }

        return this.tagRepository.create({name: name})
    }

}
