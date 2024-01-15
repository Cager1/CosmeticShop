type Product = {
    id: number;
    name: string;
    price?: number;
    description: string;
    images?: Image[];
    quantity?: number;
    categories?: Category[];
    createdAt: Date;
    updatedAt: Date;
}
