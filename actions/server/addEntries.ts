"use server"

import { prisma } from "@/lib/prismadb"
import { revalidatePath } from "next/cache";


export default async function createNewEntries(userIds: string[], competitionId: string, roundId: string, competitionName: string) {
    
    try {
        // Create multiple entries for the provided userIds
        await prisma.entry.createMany({
            data: userIds.map(userId => ({
                userId,
                competitionId,
                roundId,
            }))
        });

        // Revalidate competition page
        revalidatePath(`/admin/competition/${competitionName}`);

        return { success: true, message: `Entries for round was created successfully.` };

    } catch (error) {
        console.error('Error creating new entries', error);
        return { success: false, message: "Couldn't create new entries, please try again later." };
    }
}
