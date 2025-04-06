"use server"

import { prisma } from "@/lib/prismadb";

export default async function getAdmins() {
    try {

        const admins = await prisma.admin.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { success: true, admins: admins }

    } catch (error) {
        console.error("Error fetching admin:", error);
        return { success: false, admins: null }
    }
}