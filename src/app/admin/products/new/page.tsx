import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
    return (
        <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "2rem", color: "var(--color-earth)" }}>Add New Product</h1>
            <ProductForm />
        </div>
    );
}
