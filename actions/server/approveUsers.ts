"use server";

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { render } from "@react-email/components";

// Libs and Utils
import { sendEmail } from "@/lib/email";

// Email Template
import { ApprovalTemplate } from "@/emails/Approval";

// Environment Variables
const voteLink = process.env.VOTE_LINK!;

export default async function approvalUsers(emails: string[], customUserIds: string[], fullNames: string[], userIds: string[]) {
    try {
        if (emails.length === 0) {
            return { success: false, message: "No users selected for approval." };
        }

        // Get ongoing competition with rounds accepting votes
        const competition = await prisma.competition.findFirst({
            where: { isAcceptingContestants: true },
            select: {
                id: true,
                rounds: {
                    select: { id: true },
                    where: { acceptingVote: true },
                }
            }
        });

        if (!competition || !competition.rounds.length) {
            return { success: false, message: "No active competition round found." };
        }

        const competitionId = competition.id;
        const roundId = competition.rounds[0].id;

        // Create entries for selected users
        const entryData = userIds.map(userId => ({
            userId,
            competitionId,
            roundId,
        }));

        await prisma.entry.createMany({
            data: entryData,
        });

        // Approve selected users
        await prisma.user.updateMany({
            where: { id: { in: userIds } },
            data: { isApproved: true },
        });

        // Send Approval Emails
        for (let i = 0; i < emails.length; i++) {
            const emailTemplate = await render(
                ApprovalTemplate({
                    name: fullNames[i],
                    userLink: `${voteLink}/${customUserIds[i]}`,
                })
            );

            await sendEmail({
                to: emails[i],
                subject: "Your Registration is Approved!",
                html: emailTemplate,
            });
        }

        revalidatePath(`/admin/contestants`);

        return { success: true, message: "The contestants were approved successfully." };
    } catch (error) {
        console.error("Error approving users", error);
        return { success: false, message: "Couldn't approve users, please try again later." };
    }
}
