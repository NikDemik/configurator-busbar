import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const data = await req.json();
    const config = await prisma.config.create({ data });
    return NextResponse.json({ success: true, id: config.id });
}
