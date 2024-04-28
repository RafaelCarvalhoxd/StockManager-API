import { Product } from "../../entities/product/product";

export interface ProductRepository {
    save(product: Product): Promise<void>; 
    list(): Promise<Product[]>; 
    findById(id: string): Promise<Product | undefined>;
    delete(id: string): Promise<void>;
    update(product: Product): Promise<void>
    findByCategory(categoryId: string): Promise<Product[]>;
}