import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { Course } from 'src/entities/courses.entity';
import { Tag } from 'src/entities/tags.entity';

describe('CoursesController test e2e', () => {
  let app: INestApplication
  let module: TestingModule
  let data: any
  let courses: Course[]

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true,
}

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest
          }
        })
      ]
    }).compile()

    app = module.createNestApplication()
    await app.init()

    data = {
      name: 'Node.js',
      description: 'Node.js',
      tags: ['nodejs', 'nestjs']
    }
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize()
    const repository = dataSource.getRepository(Course)
    courses = await repository.find()
    await dataSource.destroy()
  })

  describe('POST / courses', () => {
    it('should be defined', async () => {
      const res = await request(app.getHttpServer())
      .post('/courses')
      .send(data)
      expect(201)
      console.log(res.body)
    });
  })
});