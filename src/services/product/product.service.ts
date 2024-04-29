import { Category } from "../../entities/category/category";

export type BuyProductOutputDTO = {
    id: string;
    balance: number;
}

export type SellProductOutputDTO = {
    id: string;
    balance: number;
}

export type ListProductOutputDTO = {
    products: {
        id: string;
        name: string;
        balance: number;
        price: number;
        category: {
            id: string;
            name: string;
        }
    }[]
}

export type CreateProductOutputDTO = {
    id: string;
    balance: number;
}

export interface ProductService {
    buy(id: string, amount: number): Promise<BuyProductOutputDTO>
    sell(id: string, amount: number): Promise<SellProductOutputDTO>
    list(): Promise<ListProductOutputDTO>
    create(name: string, price: number, category: Category): Promise<CreateProductOutputDTO>
}