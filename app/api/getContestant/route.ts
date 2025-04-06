import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const name: string = searchParams.get('name') || '';

    try {
        if (!name) {
            return new NextResponse("Kindly provide contestant name", { status: 400 });
        }

        const contestant = await prisma.user.findFirst({
            where: {
                fullName: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            include: {
                entries: true,
            },
        });

        return NextResponse.json({ data: contestant });

    } catch (error) {
        console.log("Error Fetching Contestant", error)
        return NextResponse.json('Something went wrong', { status: 500 });
    }
}
