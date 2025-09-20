"use server"

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";


export default async function deleteAdmin(id: string) {

    try {

        //Delete admin
        await prisma.admin.delete({
            where: {
                id
            },
        });

        revalidatePath(`/admin/staff`);
        return { success: true, message: "The admin was deleted successfully." };

    } catch (error) {
        console.log('Error deleting admin', error)
        return { success: false, error: error }
    }
}