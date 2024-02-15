import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({default:'Lorena Araque', description: 'name user'})
    name:string
    @ApiProperty({default:'lorena@gmail.com' ,description: 'email user'})
    email:string
    @ApiProperty({description: 'password'})
    password:string
}
