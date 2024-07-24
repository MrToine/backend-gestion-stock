import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, Min } from "class-validator";

export class ProductAddForm {
    @IsNotEmpty()
    name: string;

    description: string;

    @IsNotEmpty()
    @Min(0.01)
    @Max(1000000)  
    price: number;

    @IsNotEmpty()
    @Min(0)
    stock: number;

    modificationStock: number;

    @IsNotEmpty()
    createdAt: Date;
    
    updatedAt: Date;
}