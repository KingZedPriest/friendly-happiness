"use server";

import { prisma } from "@/lib/prismadb";

export default async function getSummary() {
    try {
        const [users, competitions, rounds, entries, votes] = await Promise.all([
            prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.competition.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.round.findMany({
                include: {
                    competition: {
                        select: {
                            name: true
                        }
                    },
                },
                orderBy: { createdAt: "desc" }
            }),
            prisma.entry.findMany({
                include: {
                    competition: {
                        select: {
                            name: true
                        }
                    },
                    Round: {
                        select: {
                            roundName: true
                        }
                    },
                    user: {
                        select: {
                            fullName: true
                        }
                    }
                },
                orderBy: { createdAt: "desc" }
            }),
            prisma.vote.findMany({
                include: {
                    entry: {
                        select: {
                            user: {
                                select: {
                                    fullName: true,
                                    customUserId: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: "desc" }
            })
        ]);

        return { success: true, data: { users, competitions, rounds, entries, votes } };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { success: false, data: null }
    }
}
