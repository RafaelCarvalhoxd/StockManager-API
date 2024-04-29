import { Category } from "../../../entities/category/category";
import { CategoryRepository } from "../../../repository/category/category.repository";
import { CategoryService, CreateCategoryOutputDTO, ListCategoryOutputDTO } from "../category.service";

export class CategoryServiceImplementation implements CategoryService {
    private constructor (readonly repository: CategoryRepository) {}

    public static build(repository: CategoryRepository) {
        return new CategoryServiceImplementation(repository);
    }

    public async create(name: string): Promise<CreateCategoryOutputDTO> {
        const aCategory = await Category.create(name);

        await this.repository.save(aCategory);

        const output: CreateCategoryOutputDTO = {
            id: aCategory.id,
            name: aCategory.name
        }

        return output
    };

    public async remove(id: string): Promise<void> {
       const aCategory = await this.repository.delete(id);
    }

    public async list(): Promise<ListCategoryOutputDTO> {
        const aCategories = await this.repository.list();

        const output: ListCategoryOutputDTO = {
            categories: aCategories.map(category => ({
                id: category.id,
                name: category.name
            }))
        };
        return output;
    }
}
