"use server"

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export default async function deleteRound(id: string, competitionName: string) {

    try {
        await prisma.round.delete({
            where: {
                id
            },
        });

        revalidatePath(`/admin/${competitionName}`)
        return { success: true, message: "The round was deleted successfully." }

    } catch (error) {
        console.log('Error deleting round', error)
        return { success: false, message: "Couldn't delete this round, kindly try again later." }
    }
}