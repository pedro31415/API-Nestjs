import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/courses.entity';
import { Tag } from 'src/entities/tags.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course,Tag])],
    controllers: [CoursesController],
    providers: [CoursesService]
})
export class CoursesModule {}
