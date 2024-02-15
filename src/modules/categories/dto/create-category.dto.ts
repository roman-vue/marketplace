import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({default:'Tech', description: 'name of category'})
    name:string
}
