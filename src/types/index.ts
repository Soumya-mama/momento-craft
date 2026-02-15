export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string; // JSON string
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    user: User;
    status: string;
    total: number;
    paymentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
}
