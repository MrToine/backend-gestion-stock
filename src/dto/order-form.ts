import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

class OrderProductAddForm {
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class OrderAddForm {
    @IsNotEmpty()
    @IsNumber()
    clientId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductAddForm)
    orderProducts: OrderProductAddForm[];

    @IsNotEmpty()
    @IsString()
    reference: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    total: string;
}