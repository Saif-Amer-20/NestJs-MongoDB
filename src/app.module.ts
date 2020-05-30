import { Student } from './student/student.entity';
import { Lesson } from './lesson/lesson.entity';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import { LessonModule } from './lesson/lesson.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
    autoSchemaFile:true,
  }), LessonModule, StudentModule,TypeOrmModule.forRoot({
    type:'mongodb',
    url:'mongodb://localhost:27017/school',
    synchronize:true,
    useUnifiedTopology:true,
    entities:[Lesson,Student]
  })
]
})
export class AppModule {}