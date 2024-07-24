import { IsNotEmpty, Max, Min } from "class-validator";

export class ProductEditForm {
    @IsNotEmpty()
    name: string;

    description: string;

    @IsNotEmpty()
    @Min(0.01)
    @Max(1000000)  
    price: number;

    modificationStock: number;
    
    updatedAt: Date;
}