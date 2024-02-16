import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "../products";
import { Users } from "../users";

@Entity('shooping_cart')
export class ShoopingCart extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Products, product => product.shooping_cart)
    product: Products;

    @ManyToOne(type => Users, user => user.shooping_cart)
    user: Users;
}