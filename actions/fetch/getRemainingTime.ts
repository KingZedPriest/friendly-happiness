"use server"

import { prisma } from "@/lib/prismadb";

export default async function getRemainingTime() {
    try {

        const round = await prisma.round.findFirst({
            where: {
                acceptingVote: true
            },
            select: {
                votingEnd: true
            }
        })
        return { success: true, round }


    } catch (error) {
        console.error("Error fetching remaining time:", error);
        return { success: false, round: null }
    }
}