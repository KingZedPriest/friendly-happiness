"use server"

import { prisma } from "@/lib/prismadb";

export default async function getRandomContestants() {
    try {

        // Get the active competition
        const activeCompetition = await prisma.competition.findFirst({
            where: { isOnGoing: true }
        });

        if (!activeCompetition) {
            return { successful: false, data: null }
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
            return { successful: false, data: null };
        }

        // Fetch entries separately to allow sorting
        const entries = await prisma.entry.findMany({
            where: { roundId: acceptingRound.id },
            take: 3,
            orderBy: { id: "asc" },
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

        return { successful: true, data: entries };
    } catch (error) {
        console.log("Error fetching random contestants:", error);
        return { successful: false, contestants: [] };
    }
}
