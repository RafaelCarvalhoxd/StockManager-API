import { Category } from "../../entities/category/category";

export type StockInProductOutputDTO = {
    id: string;
    balance: number;
}

export type StockOutProductOutputDTO = {
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
    name: string;
    balance: number;
    price: number;
    category: {
        id: string;
        name: string;
    }
}

export type FindByIdOutPutDTO = {
    name: string;
    price: number;
    balance: number;
    category: {
        id: string;
        name: string;
    }
}


export interface ProductService {
    stockIn(id: string, amount: number): Promise<StockInProductOutputDTO>
    stockOut(id: string, amount: number): Promise<StockOutProductOutputDTO>
    list(): Promise<ListProductOutputDTO>
    create(name: string, price: number, category: Category): Promise<CreateProductOutputDTO>
    edit(id: string, name: string, price: number, category: Category): Promise<void>
    remove(id: string): Promise<void>;
    findById(id: string): Promise<FindByIdOutPutDTO | undefined>;
}