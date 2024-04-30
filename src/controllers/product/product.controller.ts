import { Request, Response } from "express";
import { ProductRepositoryPrisma } from "../../repositories/product/prisma/product.repository.prisma";
import { prisma } from "../../util/prisma.util";
import { ProductServiceImplementation } from "../../services/product/implementation/product.service.implementation";
import { CategoryRepositoryPrisma } from "../../repositories/category/prisma/category.repository.prisma";


export class ProductController {
    private constructor() {}

    public static build() {
        return new ProductController();
    }

    public async create(req: Request, res: Response) { 
        const { name, price, categoryId } = req.body;

        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        const output = await aService.create(name, price, categoryId);

        const data = {
            id: output.id,
            name: name,
            price: price,
            quantity: output.balance,
            categoryId: {
                id: categoryId,
                name: output.category.name
            }
        }

        res.status(201).json(data).send();
    }
    
    public async list(req: Request, res: Response) {
        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        const output = await aService.list();

        const data = {
            products: output.products
        }

        res.status(200).json(data).send();
    }

    public async stockIn(req: Request, res: Response) {
        const { id } = req.params;
        const { amount } = req.body;

        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        const output = await aService.stockIn(id, amount);

        const data = {
            id: output.id,
            quantity: output.balance
        }

        res.status(200).json(data).send();
    }

    public async stockOut(req: Request, res: Response) {
        const { id } = req.params;
        const { amount } = req.body;

        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        const output = await aService.stockOut(id, amount);

        const data = {
            id: output.id,
            balance: output.balance
        }

        res.status(200).json(data).send();
    }

    public async remove(req: Request, res: Response) {
        const { id } = req.params;

        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        await aService.remove(id);

        res.status(204).send();
    }

    public async find(req: Request, res: Response) {
        const { id } = req.params;

        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        const output = await aService.findById(id);

        if (!output) {
            res.status(404).send();
            return;
        }

        const data = {
            name: output.name,
            price: output.price,
            balance: output.balance,
            category: {
                id: output.category.id,
                name: output.category.name
            }
        }

        res.status(200).json(data).send();
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price, categoryId } = req.body;

        const aRepository = ProductRepositoryPrisma.build(prisma, CategoryRepositoryPrisma.build(prisma)); 
        const aService = ProductServiceImplementation.build(aRepository);

        await aService.edit(id, name, price, categoryId);

        res.status(204).send();
    }

}