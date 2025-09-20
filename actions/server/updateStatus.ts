"use server"

import { prisma } from "@/lib/prismadb"
import { revalidatePath } from "next/cache";

export default async function updateStatus(id: string, type: string) {

    try {

        await prisma.admin.update({
            where: {
                id
            },
            data: {
                suspended: type === "suspend" ? true : false,
            },
        });

        revalidatePath(`/admin/staff`);
        return { success: true, message: "Admin status was updated successfully." };

    } catch (error) {
        console.log('Error updating admin suspension status', error)
        return { success: false, error: error }
    }
}