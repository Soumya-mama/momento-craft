import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { z } from 'zod';
import { signToken, setSession } from '@/lib/auth';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = registerSchema.parse(body);

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        const token = signToken({ userId: user.id, role: user.role });
        await setSession(token);

        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
