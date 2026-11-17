import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto{

    @IsString()
    @MaxLength(50)
    @MinLength(3)
    public name: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    public description: string;




    
}