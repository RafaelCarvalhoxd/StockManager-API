import { Product } from "../../entities/product/product";

export interface ProductRepository {
    save(product: Product): Promise<void>; 
    list(): Promise<Product[]>; 
    find(id: string): Promise<Product | null>;
    update(product: Product): Promise<void>
}