import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-courses-dto';
import { UpdateCourseDTO } from './dto/update-courses-dto';



@Controller('courses')
export class CoursesController {
    constructor(private readonly CoursesService: CoursesService){}

    @Get()
    findAll() {
        return this.CoursesService.findAll()
    }

    @Get(":id")
    findOne(@Param('id') id: string) {
        return this.CoursesService.findOne(id)
    }
    
    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO){
        return this.CoursesService.create(createCourseDTO) 
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO){
        return this.CoursesService.update(id,updateCourseDTO)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    remove(@Param('id') id: string){
        return this.CoursesService.remove(id)
    }

}
