import { ResultUnion } from './union-student-and-lesson.create';
import { StudentService } from './../student/student.service';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentType } from 'src/student/student.type';

@Resolver(of=>LessonType)
export class LessonResolver{

    constructor(
        private lessonService:LessonService,
        private studentService:StudentService
    ){

    }
    @Query(returns=> LessonType)
    lesson(@Args('id') id:string){
return this.lessonService.getLessonById(id);
    }

    @Query(returns=> [LessonType])
    lessons(){
return this.lessonService.getAllLessons();
    }

    @Mutation(returns=>LessonType)
   async creatLesson(@Args('createLessonInput')createLessonInput:CreateLessonInput):Promise<Lesson>{ 
      return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns=>LessonType)
    async assingStudentsToLesson(@Args('assingStudentsToLesson')assignStudentsToLesson:AssignStudentsToLessonInput){
        const {lessonId,studentIds}=assignStudentsToLesson;
        return this.lessonService.assignStudentsToLesson(lessonId,studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson:Lesson){
        return this.studentService.getManyStudents(lesson.students);
    }

    @Query(returns => [ResultUnion])
search(): Array<typeof ResultUnion> {
    return [new LessonType(),new StudentType()]
}
}