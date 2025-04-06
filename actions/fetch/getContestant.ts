"use server"

import { prisma } from "@/lib/prismadb";

export default async function getContestant(customUserId: string) {

    try {

        const user = await prisma.user.findUnique({
            where: {
                customUserId
            }
        })
        return { success: true, user }


    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, user: null }
    }
}