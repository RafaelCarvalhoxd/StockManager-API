import { Category } from "../../entities/category/category";

export interface CategoryRepository {
    save(category: Category): Promise<void>;
    list(): Promise<Category[]>;
    findById(id: string): Promise<Category | undefined>;
    delete(id: string): Promise<void>;
    update(category: Category): Promise<void>;
}