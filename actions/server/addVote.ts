"use server"

import { prisma } from "@/lib/prismadb";
import axios from "axios";

type VotePayload = {
    amount: number;
    userId: string;
    votes: number;
    transactionId: string;
}

export async function handleVoteSubmission({ amount, userId, votes, transactionId }: VotePayload) {

    const secretKey = process.env.LIVE_SECRET_KEY;

    try {

        // Validate vote value matches amount
        const expectedAmount = votes * 50;
        if (expectedAmount !== amount) {
            return {
                success: false,
                message: "Invalid vote amount. Please contact support to resolve your vote payment.",
            };
        }

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${transactionId}`, {
            headers: { Authorization: `Bearer ${secretKey}` }
        });

        if (response.data.status && response.data.data.status === "success") {

            // Find the user's latest valid entry
            const entry = await prisma.entry.findFirst({
                where: { userId },
                orderBy: { createdAt: "desc" },
            });

            if (!entry) {
                return {
                    success: false,
                    message: "No entry found for your account. Please contact management for your vote issue.",
                };
            }

            // Check round validity
            const round = await prisma.round.findUnique({
                where: { id: entry.roundId },
                include: { competition: true },
            });

            if (!round || !round.acceptingVote) {
                return {
                    success: false,
                    message: "Voting for this round has closed. Please contact management regarding your vote payment.",
                };
            }

            // Check if competition is still ongoing
            if (!round.competition.isOnGoing) {
                return {
                    success: false,
                    message: "This competition has ended. Kindly contact management about your vote payment.",
                };
            }

            // Begin transaction for atomic update
            await prisma.$transaction(async (tx) => {
                // Create vote document
                await tx.vote.create({
                    data: {
                        entryId: entry.id,
                        amountPaid: amount,
                        votesGiven: votes,
                        transactionId,
                    },
                });

                // Update entry vote count
                await tx.entry.update({
                    where: { id: entry.id },
                    data: {
                        voteCount: { increment: votes },
                    },
                });

                // Update round total votes
                await tx.round.update({
                    where: { id: round.id },
                    data: {
                        totalVotes: { increment: votes },
                    },
                });
            });

            return {
                success: true,
                message: "Your votes have been successfully recorded. Thank you!",
            };
        } else {
            return {
                success: false,
                message: "We couldn't confirm your transaction. Please reach out to support with your transaction ID.",
            };
        }
    } catch (error) {
        console.log("❌ Vote submission error:", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please reach out to support with your transaction ID.",
        };
    }
}
