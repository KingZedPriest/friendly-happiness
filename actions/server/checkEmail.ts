"use server"

import { prisma } from "@/lib/prismadb";


export default async function checkEmail(email: string) {

    try {
        //Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (existingUser) {
            return { success: false, message: "A user with this email already exists." }
        }

        return { success: true, message: "The admin was deleted successfully." };

    } catch (error) {
        console.error('Error search user by email', error)
        return { success: false, message: "Something went wrong, couldn't lookup the email" }
    }
}