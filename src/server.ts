
import { ApiExpress } from "./api/express/api.express";
import { CategoryRoute } from "./routes/category.route";
import { ProductsRoutes } from "./routes/product.route";

const api = ApiExpress.build();

const categoryRoute = CategoryRoute.build();
const productsRoute = ProductsRoutes.build();

api.app.use("/categories", categoryRoute.router);
api.app.use("/products", productsRoute.router);

api.start(3000);

