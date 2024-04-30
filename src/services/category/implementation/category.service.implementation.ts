import { Category } from "../../../entities/category/category";
import { CategoryRepository } from "../../../repositories/category/category.repository";
import { CategoryService, CreateCategoryOutputDTO, FindByIdOutPutDTO, ListCategoryOutputDTO } from "../category.service";

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
       const aCategory = await this.repository.find(id);

         if (!aCategory) {
              throw new Error('Category not found');
         }

            await this.repository.delete(id);
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

    public async edit(id: string, name: string): Promise<void> {
        const aCategory = await this.repository.find(id);

        if (!aCategory) {
            throw new Error('Category not found');
        }

        aCategory.edit(name);

        await this.repository.update(aCategory);
    }
    
    public async findById(id: string): Promise<FindByIdOutPutDTO | undefined> {
        const aCategory = await this.repository.find(id);

        if (!aCategory) {
            return undefined;
        }

        const output: FindByIdOutPutDTO = {
            name: aCategory.name
        };

        return output;
    }
}
