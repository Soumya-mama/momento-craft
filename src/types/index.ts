export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string; // JSON string
    stock: number;
}

export interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
}
