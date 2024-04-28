export type CategoryType = {
    id: string;
    name: string;
}

export class Category {
   private constructor(readonly type: CategoryType) {}

   static create (name: string) {
         return new Category({
            id: crypto.randomUUID().toString(),
            name
         });
   }

   public get id() {
    return this.type.id
   }

   public get name() {
        return this.type.name;
   }
   
}