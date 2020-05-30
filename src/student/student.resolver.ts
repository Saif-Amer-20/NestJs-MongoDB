import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { async } from 'rxjs/internal/scheduler/async';

@Resolver(of=>StudentType)
export class StudentResolver{

    constructor(private studentService:StudentService){

    }
    
    @Query(returns=> [StudentType])
     students(){
return this.studentService.getAll();
    }
    

    @Query(returns=>StudentType)
    Student(@Args('id')id:string){
        return this.studentService.getById(id);
    }

    @Mutation(returns=>StudentType)
    async createStudent(@Args('createStudentInput')createStudentInput:CreateStudentInput){
        return this.studentService.createStudent(createStudentInput);
    }
}
