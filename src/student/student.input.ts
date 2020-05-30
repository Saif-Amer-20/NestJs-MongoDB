import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateStudentInput{

    @Field()
    firstName:string;

    @Field()
    lastName:string;
    
}