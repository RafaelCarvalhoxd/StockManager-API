import { Category } from "../../../entities/category/category";
import { Product } from "../../../entities/product/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { StockInProductOutputDTO, CreateProductOutputDTO, ListProductOutputDTO, ProductService, StockOutProductOutputDTO, FindByIdOutPutDTO } from "../product.service";

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

    public async stockIn (id: string, amount: number): Promise<StockInProductOutputDTO> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            throw new Error('Product not found!');
        }

        aProduct.stockIn(amount);

        await this.repository.update(aProduct)

        const output: StockInProductOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity,
        };

        return output;

    }

    public async stockOut(id: string, amount: number): Promise<StockOutProductOutputDTO> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            throw new Error('Product not found!');
        }
        
        aProduct.stockOut(amount)

        await this.repository.update(aProduct)

        const output: StockOutProductOutputDTO = {
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

    public async edit(id: string, name: string, price: number, category: Category): Promise<void> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            throw new Error('Product not found!');
        }

        aProduct.edit(name, price, category);

        await this.repository.update(aProduct);
    }

    public async remove(id: string): Promise<void> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            throw new Error('Product not found!');
        }

        await this.repository.delete(id);
    }

    public async findById(id: string): Promise<FindByIdOutPutDTO | undefined> {
        const aProduct = await this.repository.find(id);

        if (!aProduct) {
            return undefined;
        }

        const output: FindByIdOutPutDTO = {
            name: aProduct.name,
            price: aProduct.price,
            balance: aProduct.quantity,
            category: aProduct.category
        }

        return output;
    }
}