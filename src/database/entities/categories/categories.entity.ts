import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesProducts } from "../categories-products/categories_products.entity";

@Entity('categories')
export class Categories extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column('varchar')
    name:string
    @OneToMany(type=> CategoriesProducts, value=> value.categorie )
    categories:CategoriesProducts[]
}