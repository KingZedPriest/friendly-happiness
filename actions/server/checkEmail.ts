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

        //Return True for users that has paid
        if (existingUser && existingUser.hasPaid && existingUser.transactionId !== null) {
            return { success: true, message: "A user with this email already exists.", hasPaid: true }
        }   

        //Return False for users that hasn't paid
        if (existingUser && !existingUser.hasPaid && existingUser.transactionId === null) {
            return { success: true, message: "Redirecting to the payment page...", hasPaid: false }
        }

        //Return False if the email doesn't exist
        return { success: false, message: "A user with the email does not exist yet.", hasPaid: false };

    } catch (error) {
        console.error('Error search user by email', error)
        return { success: false, message: "Something went wrong, couldn't lookup the email" }
    }
}