"use server"

import { prisma } from "@/lib/prismadb";

export default async function getDashboardStats() {
    try {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);

        // Fetch total counts
        const totalCompetitions = await prisma.competition.count();
        const totalUsers = await prisma.user.count();
        const totalVotes = await prisma.vote.count();
        const totalAcceptedEntries = await prisma.user.count({ where: { isApproved: true } });

        // Fetch last created records
        const lastCompetition = await prisma.competition.findFirst({ orderBy: { createdAt: "desc" }, select: { createdAt: true } });
        const lastUser = await prisma.user.findFirst({ orderBy: { createdAt: "desc" }, select: { createdAt: true } });
        const lastVote = await prisma.vote.findFirst({ orderBy: { createdAt: "desc" }, select: { createdAt: true } });
        const lastAcceptedEntry = await prisma.user.findFirst({ where: { isApproved: true }, orderBy: { createdAt: "desc" }, select: { createdAt: true } });

        // Fetch votes gotten yesterday
        const totalVotesYesterday = await prisma.vote.count({
            where: {
                createdAt: {
                    gte: new Date(yesterday.setHours(0, 0, 0, 0)),
                    lt: new Date(today.setHours(0, 0, 0, 0))
                }
            }
        });

        // Fetch votes gotten today
        const totalVotesToday = await prisma.vote.count({
            where: {
                createdAt: {
                    gte: new Date(today.setHours(0, 0, 0, 0))
                }
            }
        });

        // Fetch total users in the last 6 months
        const totalUsersLastSixMonths = await prisma.user.count({
            where: {
                createdAt: {
                    gte: sixMonthsAgo
                }
            }
        });

        // Fetch last 6 votes
        const lastSixVotes = await prisma.vote.findMany({
            orderBy: { createdAt: "desc" },
            take: 6,
            select: {
                createdAt: true,
                amountPaid: true,
                transactionId: true,
                entry: {
                    select: {
                        user: {
                            select: {
                                fullName: true
                            }
                        },
                    }
                }
            }
        });

        // Fetch last 10 votes with populated user data
        const lastTenVotes = await prisma.vote.findMany({
            orderBy: { createdAt: "desc" },
            take: 10,
            select: {
                createdAt: true,
                entry: {
                    select: {
                        user: {
                            select: {
                                customUserId: true,
                                fullName: true
                            }
                        },
                        voteCount: true
                    }
                }
            }
        });

        return {
            success: true,
            totalCompetitions,
            totalUsers,
            totalVotes,
            totalAcceptedEntries,
            lastCompetitionTimestamp: lastCompetition?.createdAt || null,
            lastUserTimestamp: lastUser?.createdAt || null,
            lastVoteTimestamp: lastVote?.createdAt || null,
            lastAcceptedEntryTimestamp: lastAcceptedEntry?.createdAt || null,
            totalVotesYesterday,
            totalVotesToday,
            totalUsersLastSixMonths,
            lastSixVotes,
            lastTenVotes: lastTenVotes.map(vote => ({
                createdAt: vote.createdAt,
                customUserId: vote.entry?.user?.customUserId || null,
                fullName: vote.entry?.user?.fullName || null,
                voteCount: vote.entry?.voteCount || 0
            }))
        };
    } catch (error) {
        console.log("Error fetching dashboard stats:", error);
        return { success: false };
    }
}
