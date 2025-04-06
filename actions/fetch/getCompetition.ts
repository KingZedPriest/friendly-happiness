"use server"

import { prisma } from "@/lib/prismadb";

export default async function getCompetitions() {
    try {

        const competitions = await prisma.competition.findMany({})
        return { success: true, competitions }


    } catch (error) {
        console.error("Error fetching competitions:", error);
        return { success: false }
    }
}