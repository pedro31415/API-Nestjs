import { randomUUID } from 'crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-courses-dto';
import { UpdateCourseDTO } from './dto/update-courses-dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string
  let created_at: Date
  let expectOutputTags: any
  let expectOutputCourses: any
  let mockCourseRepository: any
  let mockTagRepository: any

  beforeEach(async () => {
    service = new CoursesService()
    id = randomUUID()
    created_at = new Date()
    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at

      }
    ]
    expectOutputCourses = [
      {
        id,
        name: 'test',
        description: 'test description', 
        created_at
      }
    ]

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository
    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    }

    const newCourse = await service.create(createCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(newCourse)
  })

  it('should list all  courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository
   
    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(courses)
  })

  it('should gets a course by id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository
   
    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  })

  it('update a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository
    const updateCourseDTO: UpdateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    }

    const course = await service.update(id,updateCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(mockCourseRepository.preload).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  })

  it('remove a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const removeCourse = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(mockCourseRepository.remove).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(removeCourse)
  })

});
