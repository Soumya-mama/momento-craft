import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { z } from 'zod';
import { signToken, setSession } from '@/lib/auth';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = loginSchema.parse(body);

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

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
