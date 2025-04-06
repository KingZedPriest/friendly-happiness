"use server"

import { prisma } from "@/lib/prismadb";

export default async function getAdmin(id: string) {

    try {
        const getAdmin = await prisma.admin.findUnique({
            where: {
                id
            }
        });

        if (!getAdmin) { throw new Error("Admin with Id not found") }

        return getAdmin;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(`There was an error in fetching the admin with Id ${id}, the error: ${error.stack}`);
        throw error;
    }

}
