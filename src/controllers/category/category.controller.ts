import { Request, Response } from "express";
import { CategoryRepositoryPrisma } from "../../repositories/category/prisma/category.repository.prisma";
import { CategoryServiceImplementation } from "../../services/category/implementation/category.service.implementation";
import { prisma } from "../../util/prisma.util";

export class CategoryController {
    private constructor() {}

    public static build() {
        return new CategoryController();
    }

    public async create(req: Request, res: Response) {
        const { name } = req.body;
        
        const aRepository = CategoryRepositoryPrisma.build(prisma);
        const aService = CategoryServiceImplementation.build(aRepository);

        const output = await aService.create(name);

        const data = {
            id: output.id,
            name: name
        }

        res.status(201).json(data).send();
    }

    public async list(req: Request, res: Response) {
        const aRepository = CategoryRepositoryPrisma.build(prisma);
        const aService = CategoryServiceImplementation.build(aRepository);

        const output = await aService.list();

        const data = {
            categories: output.categories
        }

        res.status(200).json(data).send();
    }

    public async find(req: Request, res: Response) {
        const { id } = req.params;

        const aRepository = CategoryRepositoryPrisma.build(prisma);
        const aService = CategoryServiceImplementation.build(aRepository);

        const output = await aService.findById(id);

        if (!output) {
            res.status(404).send();
            return;
        }

        const data = {
            name: output.name
        }

        res.status(200).json(data).send();
    }

    public async remove(req: Request, res: Response) {
        const { id } = req.params;

        const aRepository = CategoryRepositoryPrisma.build(prisma);
        const aService = CategoryServiceImplementation.build(aRepository);

        await aService.remove(id);

        res.status(204).send();
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;

        const aRepository = CategoryRepositoryPrisma.build(prisma);
        const aService = CategoryServiceImplementation.build(aRepository);

        const output = await aService.edit(id, name);

        if (output === undefined) {
            res.status(404).send();
            return;
        }

        const data = {
            id: id,
            name: name
        }

        res.status(200).json(data).send();
    }
}