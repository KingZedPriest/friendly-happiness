"use server"

import { prisma } from "@/lib/prismadb"
import { revalidatePath } from "next/cache";

export default async function editRound({ data, competitionName }: { data: RoundData, competitionName: string }) {

    try {

        //Check if the competition has any active round
        if (data.acceptingVote) {
            const isAnotherActive = await prisma.round.findFirst({
                where: {
                    competitionId: data.competitionId,
                    acceptingVote: true
                }
            })
            if (isAnotherActive) return { success: false, message: "Sorry, but two different rounds in a competition can't be accepting votes." };
        }

        await prisma.round.update({
            where: {
                id: data.id
            },
            data: {
                roundName: data.roundName.toLowerCase(),
                votingStart: new Date(data.votingStart).toISOString(),
                votingEnd: new Date(data.votingEnd).toISOString(),
                acceptingVote: data.acceptingVote
            },
        });

        revalidatePath(`/admin/${competitionName}`);
        return { success: true, message: `${data.roundName} details was updated successfully.` };

    } catch (error) {
        console.log('Error updating round details', error)
        return { success: false, message: "Couldn't update round details, kindly try again later." }
    }
}