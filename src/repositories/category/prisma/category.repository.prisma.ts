import { PrismaClient } from "@prisma/client";
import { CategoryRepository } from "../category.repository";
import { Category } from "../../../entities/category/category";

export class CategoryRepositoryPrisma implements CategoryRepository {
    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new CategoryRepositoryPrisma(prisma);
    }

    public async save(category: Category): Promise<void> {
        const manyCategories = await this.prisma.category.findMany()

        if(manyCategories.some(c => c.name === category.name)) {
            throw new Error('Category already exists!')
        }
        
        const data = {
            id: category.id,
            name: category.name
        }

        await this.prisma.category.create({
            data
        });
    }

    public async list(): Promise<Category[]> {
       const aCategories = await this.prisma.category.findMany();

        const categories: Category[] = aCategories.map(category => {
            return Category.with(category.id, category.name);
        });

        return categories;
    }

    public async update(category: Category): Promise<void> {
        const aCategory = await this.prisma.category.findUnique({
            where: {
                id: category.id
            }
        });

        if (!aCategory) {
            throw new Error('Category not found');
        }

        const data = {
            name: category.name
        }

        await this.prisma.category.update({
            where: {
                id: category.id
            },
            data
        });
    }

    public async find(id: string): Promise<Category | undefined> {
        const aCategory = await this.prisma.category.findUnique({
            where: {
                id: id
            }
        });

        if (!aCategory) {
            return undefined;
        }

        return Category.with(aCategory.id, aCategory.name);
    }

    public async delete(id: string): Promise<void> {
        const aCategory = await this.prisma.category.findUnique({
            where: {
                id: id
            }
        });

        if (!aCategory) {
            throw new Error('Category not found');
        }

        await this.prisma.category.delete({
            where: {
                id: id
            }
        });
    }
}