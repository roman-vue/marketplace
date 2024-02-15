import { TypeProfile } from "src/utils/enums/type-profile.enum";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShoopingCart } from "../shooping_cart";
import { Products } from "../products";

@Entity('users')
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('varchar')
    name: string

    @Column('varchar')
    email: string

    @Column('varchar')
    password:string

    @Column('boolean')
    status:boolean

    @Column('varchar')
    type:TypeProfile

    @OneToMany(type=> ShoopingCart, value=> value.users)
    shooping_cart: ShoopingCart[]

    @OneToMany(type=> Products, value=> value.user)
    products: Products[]
}