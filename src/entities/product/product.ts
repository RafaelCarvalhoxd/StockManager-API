import { CategoryType } from "../category/category";

export type ProductType = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    category: CategoryType;
}

export class Product {
    private constructor(readonly type: ProductType) {}

    static create(name: string, price: number, category: CategoryType) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            quantity: 0,
            price,
            category
        });
    }

    public static with(id: string, name: string, quantity: number, price: number, category: CategoryType) {
        return new Product({id, name, quantity, price, category})
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

    public get category() {
        return this.type.category;
    }

    public stockIn (amount: number) {
        this.type.quantity += amount;
    }

    public stockOut (amount: number) {
        if (this.type.quantity < amount) {
            throw new Error('Insufficient quantity of products in stock.');
        }
        
        this.type.quantity -= amount;
    }

    public edit (name: string, price: number, category: CategoryType) {
        this.type.name = name;
        this.type.price = price;
        this.type.category = category;
    }

}