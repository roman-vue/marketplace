import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ShoopingCart } from "../shooping_cart";
import { Products } from "../products";

@Entity('users')
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('varchar')
    name: string

    @Column('varchar', {unique:true})
    email: string

    @Column('varchar')
    password:string

    @Column('boolean')
    status:boolean

    @OneToMany(type=> ShoopingCart, value=> value.user)
    shooping_cart: ShoopingCart[]

    @OneToMany(type=> Products, value=> value.user)
    products: Products[]
}