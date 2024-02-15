import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "../products";
import { Users } from "../users";

@Entity('shooping_cart')
export class ShoopingCart extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(type=>  Products, value=> value.shooping_cart)
    products: Products[]

    @ManyToOne(type => Users , value=> value.shooping_cart)
    users: Users[]
}