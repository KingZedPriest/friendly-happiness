"use server"

import { prisma } from "@/lib/prismadb";

export default async function fetchCompetition(name: string) {
    
    try {
        const competition = await prisma.competition.findUnique({
            where: {
                name: name.toLowerCase()
            },
            include: {
                rounds: {
                    include: {
                        entries: {
                            select: {
                                id: true,
                                userId: true,
                                voteCount: true,
                                user: {
                                    select: {
                                        fullName: true,
                                        danceVideo: true,
                                        customUserId: true,
                                    }
                                }
                            }
                        }
                    }
                },
                entries: {
                    select: {
                        id: true,
                        userId: true,
                        voteCount: true,
                        user: {
                            select: {
                                fullName: true,
                                danceVideo: true,
                                customUserId: true,
                            }
                        }
                    }
                }
            }
        });

        if (!competition) return { success: false, competition: null };

        return { success: true, competition };

    } catch (error) {
        console.log("Error fetching competition:", error);
        return { success: false };
    }
}
