import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/courses.entity';
import { Tag } from 'src/entities/tags.entity';



@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => {
            return {
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASS'),
                database: configService.get('DB_NAME'),
                entities: [Course, Tag],
                synchronize: false,
            }
        },
        inject: [ConfigService],
    })] 
})
export class DatabaseModule {}
