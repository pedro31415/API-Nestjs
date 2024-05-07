import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1714512358156 } from "src/migrations/1714512358156-CreateCoursesTable";
import { CreateTagsTable1714514543519 } from "src/migrations/1714514543519-CreateTagsTable";
import { CreateCoursesTagsTable1714570628128 } from "src/migrations/1714570628128-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1714571425309 } from "src/migrations/1714571425309-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1714573022094 } from "src/migrations/1714573022094-AddTagsIdToCoursesTagsTable";
import { Course } from "src/entities/courses.entity";
import { Tag } from "src/entities/tags.entity";


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: false,
}


export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1714512358156, CreateTagsTable1714514543519,CreateCoursesTagsTable1714570628128, AddCoursesIdToCoursesTagsTable1714571425309, AddTagsIdToCoursesTagsTable1714573022094]
})