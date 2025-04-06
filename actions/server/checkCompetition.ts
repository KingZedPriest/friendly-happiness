"use server"

import { prisma } from "@/lib/prismadb";


export default async function checkCompetition() {

    try {
        //Delete admin
        const activeCompetition = await prisma.competition.findFirst({
            where: {
                isAcceptingContestants: true
            },
        });

        if (!activeCompetition) {
            return { success: false }
        }

        return { success: true };

    } catch (error) {
        console.error('Error fetching active competition', error)
        return { success: false }
    }
}