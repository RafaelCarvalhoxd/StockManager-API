export type CreateCategoryOutputDTO = {
    id: string;
    name: string;
}

export type ListCategoryOutputDTO = {
    categories: {
        id: string;
        name: string;
    }[]
}

export type FindByIdOutPutDTO = {
    name: string;
}

export interface CategoryService {
    create(name: string): Promise<CreateCategoryOutputDTO>;
    list(): Promise<ListCategoryOutputDTO>;
    remove(id: string): Promise<void>;
    edit(id: string, name: string): Promise<void>;
    findById(id: string): Promise<FindByIdOutPutDTO | undefined>;
}