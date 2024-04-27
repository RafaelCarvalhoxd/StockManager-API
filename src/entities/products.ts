import { CategoryType } from "./category";

export type ProductType = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    categoryId: CategoryType;
}

export class Product {
    private constructor(readonly type: ProductType) {}

    static create(name: string, price: number, categoryId: CategoryType) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            quantity: 0,
            price,
            categoryId
        });
    }

    public get id() {
        return this.type.id;
    }

    public get name() {
        return this.type.name;
    }

    public get quantity() {
        return this.type.quantity;
    }

    public get price() {
        return this.type.price;
    }

    public get categoryId() {
        return this.type.categoryId;
    }

    public buyProducts (quantity: number) {
        this.type.quantity += quantity;
    }

    public sellProducts (quantity: number) {
        if (this.type.quantity < quantity) {
            throw new Error('Insufficient quantity of products in stock.');
        }
        
        this.type.quantity -= quantity;
    }

}