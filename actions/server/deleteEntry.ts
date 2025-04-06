"use server";

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export default async function deleteEntries(ids: string[], competitionName: string) {
    try {
        await prisma.entry.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        revalidatePath(`/admin/${competitionName}`);
        return { success: true, message: "Entries were deleted successfully." };

    } catch (error) {
        console.error("Error deleting entries", error);
        return { success: false, message: "Couldn't delete the entries, kindly try again later." };
    }
}
