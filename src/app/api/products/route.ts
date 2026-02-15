import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.number().positive(),
    category: z.string(), // "portraits", "crafts", "gifts"
    images: z.string(), // JSON string
    stock: z.number().int().nonnegative(),
});

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const where = category ? { category } : {};

    try {
        const products = await db.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getSession();

    if (!session || session.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const data = productSchema.parse(body);

        const product = await db.product.create({
            data,
        });

        return NextResponse.json({ product });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
