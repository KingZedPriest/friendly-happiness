"use server"

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export default async function deleteUser(id: string) {

    try {

        const totalEntries = await prisma.entry.findMany({
            where: { userId: id }
        });

        if (totalEntries.length > 0) return { success: false, message: "Users will active entries cannot be deleted" }

        await prisma.user.delete({
            where: {
                id
            },
        });

        revalidatePath(`/admin/contestants`)
        return { success: true, message: "The user was deleted successfully." }

    } catch (error) {
        console.log('Error deleting user', error)
        return { success: false, message: "Couldn't delete this user, kindly try again later." }
    }
}