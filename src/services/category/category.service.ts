export type CreateCategoryOutputDTO = {
    name: string;
}

export type ListCategoryOutputDTO = {
    categories: {
        id: string;
        name: string;
    }[]
}

export interface CategoryService {
    create(name: string): Promise<CreateCategoryOutputDTO>;
    list(): Promise<ListCategoryOutputDTO>;
}