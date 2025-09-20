"use server"

import { prisma } from "@/lib/prismadb"

export default async function updatePaymentStatus(email: string, transactionId: string) {

    try {

        await prisma.user.update({
            where: {
                email
            },
            data: {
                hasPaid: true,
                transactionId,
            },
        });

        return { success: true, message: "Your payment status was updated successfully." };

    } catch (error) {
        console.log('Error updating user payment status', error)
        return { success: false, error: error }
    }
}