"use server"

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export default async function deleteUser(id: string) {

    try {
        await prisma.user.delete({
            where: {
                id
            },
        });

        revalidatePath(`/admin/contestants`)
        return { success: true, message: "The user was deleted successfully." }

    } catch (error) {
        console.error('Error deleting user', error)
        return { success: false, message: "Couldn't delete this user, kindly try again later." }
    }
}