type Product = {
    id: number;
    name: string;
    price?: number;
    description: string;
    images?: Image[];
    amount?: number;
    categories?: Category[];
    createdAt: Date;
    updatedAt: Date;
}
