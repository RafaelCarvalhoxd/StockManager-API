import { ApiExpress } from "../api/express/api.express";
import { CategoryController } from "../controllers/category/category.controller";
import { Router } from "express";

export class CategoryRoute {
    private constructor(readonly router: Router) {}

    public static build() {
        const router = Router();
        const controller = CategoryController.build();
        const route = new CategoryRoute(router);

        router.get("/", controller.list);
        router.get("/:id", controller.find);
        router.post("/", controller.create);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.remove);

        return route;
    }
}

