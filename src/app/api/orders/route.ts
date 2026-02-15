import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        const body = await req.json();
        const { items, total, shippingAddress } = body;

        // In a real app, verify total price from DB to prevent tampering
        // and process payment first.

        // If user is logged in, link order to user. If guest, create a user or just link to null (if schema allows).
        // Our schema requires userId for Order. So we MUST link to a user.
        // If guest, we could create a "guest" user or prompt login.
        // For now, let's assuming guest checkout creates a temporary user or checks if email exists.

        let userId = session?.userId;

        if (!userId) {
            // Check if user with email exists
            let user = await db.user.findUnique({ where: { email: shippingAddress.email } });
            if (!user) {
                // Create guest user
                const hashedPassword = 'guest-password-placeholder'; // In real app, generate random or handle differently
                user = await db.user.create({
                    data: {
                        email: shippingAddress.email,
                        name: shippingAddress.name,
                        password: hashedPassword,
                        role: 'customer'
                    }
                });
            }
            userId = user.id;
        }

        const order = await db.order.create({
            data: {
                userId,
                total,
                status: 'pending',
                paymentStatus: 'paid', // Mock payment success
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        return NextResponse.json({ id: order.id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
