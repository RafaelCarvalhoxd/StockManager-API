import { Category } from "../../entities/category/category";

export interface CategoryRepository {
    save(category: Category): Promise<void>;
    list(): Promise<Category[]>;
    find(id: string): Promise<Category | undefined>;
    delete(id: string): Promise<void>;
}