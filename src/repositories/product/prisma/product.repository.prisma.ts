import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../product.repository";
import { Product } from "../../../entities/product/product";
import { CategoryRepository } from "../../category/category.repository";

export class ProductRepositoryPrisma implements ProductRepository {
    private categoryRepository: CategoryRepository;

    private constructor(private readonly prisma: PrismaClient, categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public static build(prisma: PrismaClient, categoryRepository: CategoryRepository): ProductRepositoryPrisma {
        return new ProductRepositoryPrisma(prisma, categoryRepository);
    }

    public async save(product: Product): Promise<void> {

        const category = await this.categoryRepository.find(product.category.id);

        if (!category) {
            throw new Error('Category not found!');
        }

        const manyProducts = await this.prisma.product.findMany()

        if(manyProducts.some(p => p.name === product.name)) {
            throw new Error('Product already exists!')
        }

        const data = {
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            category: {
                connect: { id: product.category.id }
            }
        };

        await this.prisma.product.create({
            data
        });
    }

    public async list(): Promise<Product[]> {
        const aProducts = await this.prisma.product.findMany();

        const products: Product[] = await Promise.all(aProducts.map(async (product) => {
            const category = await this.categoryRepository.find(product.categoryId);
            if (!category) {
                throw new Error(`Category not found for product with ID ${product.id}`);
            }
            return Product.with(product.id, product.name, product.quantity, product.price, category);
        }));

        return products;
    }
    public async update(product: Product): Promise<void> {
        const aProduct = await this.prisma.product.findUnique({
            where: {
                id: product.id
            }
        })
    
        if(!aProduct) {
            throw new Error('Product not found!')
        }
    
        const aCategory = await this.categoryRepository.find(product.category.id);
    
        if (!aCategory) {
            throw new Error('Category not found!');
        }
    
        const data = {
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            category: {
                connect: { id: product.category.id }
            }
        }
    
        await this.prisma.product.update({
            where: {
                id: product.id
            },
            data
        })
    }

    public async find(id: string): Promise<Product | null> {
        const aProduct = await this.prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if(!aProduct) {
            throw new Error('Product not found!')
        }

        const category = await this.categoryRepository.find(aProduct.categoryId);

        if (!category) {
            throw new Error('Category not found!');
        }

        return Product.with(aProduct.id, aProduct.name, aProduct.quantity, aProduct.price,  category)
    }

    public async delete(id: string): Promise<void> {
        const aProduct = await this.prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if(!aProduct) {
            throw new Error('Product not found!')
        }

        await this.prisma.product.delete({
            where: {
                id: id
            }
        })
    }
}