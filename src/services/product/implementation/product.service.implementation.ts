import { Category } from "../../../entities/category/category";
import { Product } from "../../../entities/product/product";
import { ProductRepository } from "../../../repository/product/product.repository";
import { BuyProductOutputDTO, CreateProductOutputDTO, ListProductOutputDTO, ProductService, SellProductOutputDTO } from "../product.service";

export class ProductServiceImplementation implements ProductService {
    private constructor(readonly repository: ProductRepository){}

    public static build(repository: ProductRepository) {
        return new ProductServiceImplementation(repository)
    }

    public async create(name: string, price: number, category: Category): Promise<CreateProductOutputDTO> {
        const aProduct = Product.create(name, price, category);

        await this.repository.save(aProduct);

        const output: CreateProductOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity
        };

        return output;
    }

    public async buy(id: string, amount: number): Promise<BuyProductOutputDTO> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            throw new Error('Product not found!');
        }

        aProduct.buy(amount);

        await this.repository.update(aProduct)

        const output: BuyProductOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity,
        };

        return output;

    }

    public async sell(id: string, amount: number): Promise<SellProductOutputDTO> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            throw new Error('Product not found!');
        }
        
        aProduct.sell(amount)

        await this.repository.update(aProduct)

        const output: SellProductOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity,
        };

        return output;
    }

    public async list(): Promise<ListProductOutputDTO> {
        const aProducts = await this.repository.list();

        const output: ListProductOutputDTO = {
            products: aProducts.map((p) =>({
                id: p.id,
                name: p.name,
                balance: p.quantity,
                price: p.price,
                category: p.category
            })) 
        }

        return output
    }
}