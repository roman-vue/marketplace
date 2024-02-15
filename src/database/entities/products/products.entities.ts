import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShoopingCart } from "../shooping_cart";
import { Users } from "../users";
import { CategoriesProducts } from "../categories-products";

@Entity('products')
export class Products extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('varchar')
    name:string

    @Column('varchar')
    description: string
    
    @Column('int')
    price:number

    @Column('int')
    stock:number

    @OneToMany(type=> ShoopingCart, value=> value.products)
    shooping_cart:ShoopingCart

    @ManyToOne(type=> Users, value=> value.products)
    user: Users

    @OneToMany(type=>CategoriesProducts, value=> value.product)
    categories:CategoriesProducts[]
}