import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {

    const body: CompetitionFormData = await request.json();

    try {

        const { name, startDate, endDate } = body;
        if (!name || !startDate || !endDate) {
            return NextResponse.json({ error: "Incomplete Details, Kindly Provide All Necessary Details" }, { status: 400 });
        }

        //Check a competition has that name and throw an error
        const existingName = await prisma.competition.findUnique({
            where: {
                name: name.toLowerCase()
            }
        })
        if (existingName) return NextResponse.json({ error: "A competition with the name already exists, kindly choose another name." }, { status: 409 });

        //Check if there is an active competition and throw an error
        const anotherActive = await prisma.competition.findFirst({
            where: {
                isOnGoing: true
            }
        })
        if (anotherActive) return NextResponse.json({ error: "Another competition is currently ongoing, kindly uncheck it before continuing." }, { status: 403 });

        //Check if there is another competition accepting contestants
        const anotherAcceptingContestant = await prisma.competition.findFirst({
            where: {
                isAcceptingContestants: true
            }
        })
        if (anotherAcceptingContestant) return NextResponse.json({ error: "Another competition is currently accepting contestants, kindly uncheck it before continuing." }, { status: 403 });

        // Create event
        const newCompetition = await prisma.competition.create({
            data: {
                name: name.toLowerCase(),
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
            }
        });

        return NextResponse.json(newCompetition);

    } catch (error) {
        console.error("Error creating competition:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}