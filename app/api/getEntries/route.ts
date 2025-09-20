import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        // Get the active competition
        const activeCompetition = await prisma.competition.findFirst({
            where: { isOnGoing: true }
        });

        if (!activeCompetition) {
            return NextResponse.json({ error: "There is no active competition." }, { status: 400 });
        }

        // Get the accepting round
        const acceptingRound = await prisma.round.findFirst({
            where: {
                competitionId: activeCompetition.id,
                acceptingVote: true
            },
            select: {
                votingEnd: true,
                id: true
            }
        });

        if (!acceptingRound) {
            return NextResponse.json({ error: "There is no active round, kindly try again later." }, { status: 403 });
        }

        // Fetch entries separately to allow sorting
        const entries = await prisma.entry.findMany({
            where: { roundId: acceptingRound.id },
            orderBy: { voteCount: "desc" },
            skip,
            take: limit,
            select: {
                voteCount: true,
                user: {
                    select: {
                        fullName: true,
                        customUserId: true,
                        danceVideo: true,
                        story: true,
                        createdAt: true
                    }
                }
            }
        });

        const totalEntries = await prisma.entry.count({
            where: { roundId: acceptingRound.id }
        });

        return NextResponse.json({
            data: entries,
            meta: {
                total: totalEntries,
                page,
                totalPages: Math.ceil(totalEntries / limit),
                hasNextPage: page * limit < totalEntries,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.log("Error Fetching Contestants", error);
        return NextResponse.json(
            { error: "Couldn't fetch contestants' details, kindly try again." },
            { status: 500 }
        );
    }
}