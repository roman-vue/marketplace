import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";
import { Products } from "../products";

@Entity('categories_products')
export class CategoriesProducts extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(type=> Categories, value=> value.categories)
    categorie:Categories

    @ManyToOne(type=> Products, value=> value.categories)
    product:Products
}