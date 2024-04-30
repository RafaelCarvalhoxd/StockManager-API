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

   public static with(id: string, name: string) {
       return new Category({id, name});
   }

   public get id() {
    return this.type.id
   }

   public get name() {
        return this.type.name;
   }

   public edit (name: string) {
       this.type.name = name;
   }
   
}