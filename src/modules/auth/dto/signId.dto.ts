import { ApiProperty } from "@nestjs/swagger"

export class SignInDto {
    @ApiProperty({default:'lorena@gmail.com'})
    email:string
    @ApiProperty({default:'password'})
    password:string
}
