export type BuyProductOutputDTO = {
    productId: string;
    balance: number;
}

export type SellProductOutputDTO = {
    productId: string;
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
    buy(productId: string, amount: number): Promise<BuyProductOutputDTO>
    sell(productId: string, amount: number): Promise<SellProductOutputDTO>
    list(): Promise<ListProductOutputDTO>
    create(name: string, price: number, categoryId: string): Promise<CreateProductOutputDTO>
}