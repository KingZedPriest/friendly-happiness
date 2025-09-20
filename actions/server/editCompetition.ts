"use server"

import { prisma } from "@/lib/prismadb"
import { revalidatePath } from "next/cache";

type FormData = Omit<CompetitionData, 'createdAt'>;
export default async function editCompetition({ id, name, startDate, endDate, isOnGoing, isAcceptingContestants }: FormData) {

    try {

        await prisma.competition.update({
            where: {
                id
            },
            data: {
                name: name.toLowerCase(),
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                isOnGoing,
                isAcceptingContestants
            },
        });

        revalidatePath(`/admin/competition`);
        return { success: true, message: `${name} details was updated successfully.` };

    } catch (error) {
        console.log('Error updating competition details', error)
        return { success: false, message: "Couldn't update competition details, kindly try again later." }
    }
}