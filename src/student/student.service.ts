import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {v4 as uuid} from 'uuid';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){

    }

    async getById(id:string):Promise<Student>{

        return this.studentRepository.findOne({id});
    }
    async getAll():Promise<Student[]>{
        return this.studentRepository.find();
    }
    async createStudent(createStudentInput:CreateStudentInput):Promise<Student>{
  
        const {firstName,lastName}=createStudentInput;
        const student= this.studentRepository.create({
         
            id:uuid(),
            firstName,
            lastName
        });

         return this.studentRepository.save(student);
       
    }

    async getManyStudents(studentsId:string[]):Promise<Student[]>{
return this.studentRepository.find({where:{id:{$in:studentsId,}}});
    }
}
