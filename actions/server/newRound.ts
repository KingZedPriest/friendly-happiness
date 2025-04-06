"use server"

import { prisma } from "@/lib/prismadb"
import { revalidatePath } from "next/cache";


export default async function createNewRound(competitionId: string, roundName: string, votingStart: string, votingEnd: string, acceptingVote: boolean) {

    try {

        //Check if the competition has any active round
        if (acceptingVote) {
            const isAnotherActive = await prisma.round.findFirst({
                where: {
                    competitionId,
                    acceptingVote: true
                }
            })
            if (isAnotherActive) return { success: false, message: "Sorry, but two different rounds in a competition can't be accepting votes." };
        }

        //Create a new round
        await prisma.round.create({
            data: {
                competitionId,
                roundName: roundName.toLowerCase(),
                votingStart: new Date(votingStart).toISOString(),
                votingEnd: new Date(votingEnd).toISOString(),
                acceptingVote
            },
        });

        revalidatePath(`/admin/competition/${competitionId}`);
        return { success: true, message: `${roundName} was created successfully.` };

    } catch (error) {
        console.error('Error creating new round', error)
        return { success: false, message: "Couldn't create new round, kindly try again later." }
    }
}