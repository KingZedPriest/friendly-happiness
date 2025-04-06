import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const id: string = searchParams.get('id') || '';

    try {
        if (!id || id === "") {
            return new NextResponse("Kindly provide round id", { status: 400 });
        }

        const round = await prisma.round.findUnique({
            where: {
                id
            },
            include: {
                entries: {
                    select: {
                        userId: true
                    }
                },
            },
        });

        return NextResponse.json({ data: round });

    } catch (error) {
        console.log("Error Fetching Round", error)
        return NextResponse.json({ error: "Couldn't fetch round details, kindly try again" }, { status: 500 });
    }
}
