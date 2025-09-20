"use server"

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export default async function deleteCompetition(id: string) {

    try {
        //Delete Competition
        await prisma.competition.delete({
            where: {
                id
            },
        });

        revalidatePath(`/admin/competition`);
        return { success: true, message: "The competition was deleted successfully." };

    } catch (error) {
        console.log('Error deleting competition', error)
        return { success: false, error: error }
    }
}
