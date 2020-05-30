import { LessonType } from './lesson.type';
import { StudentType } from './../student/student.type';
import { createUnionType } from "@nestjs/graphql";

export const ResultUnion=createUnionType({name: 'Result',
types: () => [LessonType, StudentType],
});