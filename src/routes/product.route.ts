import { Router } from "express";
import { ProductController } from "../controllers/product/product.controller";

export class ProductsRoutes {
    private constructor(readonly router: Router) {}

    public static build() {
        const router = Router();
        const controller = ProductController.build();
        const route = new ProductsRoutes(router);

        router.get("/", controller.list);
        router.get("/:id", controller.find);
        router.post("/", controller.create);
        router.post("/:id/stockin", controller.stockIn);
        router.post("/:id/stockout", controller.stockOut);
        router.put("/:id", controller.edit);
        router.delete("/:id", controller.remove);

        return route;
    }
}