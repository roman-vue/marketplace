import { ApiProperty } from "@nestjs/swagger";


class CategoryDto{
    @ApiProperty({default: 'uuid of category', description: 'add one uuid of category'})
    cotegoryId: string
}

export class CreateProductDto {
    @ApiProperty({default: 'laptop', description: 'name of product'})
    name:string
    @ApiProperty({default: 'this is a laptop', description: 'description of product'})
    description:string
    @ApiProperty({default: 40000, description: 'price'})
    price:number
     @ApiProperty({type: [CategoryDto]})
    categories:CategoryDto[]
    @ApiProperty({default: 1, description: 'quantity'})
    stock:number
}
