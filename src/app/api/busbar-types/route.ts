// app/api/busbar-types/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const busbarTypes = await prisma.busbarType.findMany({
            select: {
                id: true,
                name: true, // 'TROLLEY', 'MONO'
                label: true, // 'Троллейный', 'Монотроллейный'
                description: true,
            },
            orderBy: { id: 'asc' },
        });

        return NextResponse.json(busbarTypes);
    } catch (error) {
        console.error('Error fetching busbar types:', error);
        return NextResponse.json({ error: 'Failed to fetch busbar types' }, { status: 500 });
    }
}
