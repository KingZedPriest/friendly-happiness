import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { render } from "@react-email/components";

//Utils, Actions, Templates
import { generateUserId } from "@/utils/generate";
import { sendEmail } from "@/lib/email";
import RegisterTemplate from "@/emails/Registration";


export async function POST(request: NextRequest) {
    const adminEmail = process.env.EMAIL_NOTIFICATION ?? "goldnueltalents@gmail.com";
    const body = await request.json();
    
    try {
        const { userDetails, imageLinks } = body;

        const email = userDetails.emailAddress.toLowerCase();
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "A user with this email exists, kindly try with another email address." }, { status: 409 });
        }

        let customUserId: string;
        do {
            customUserId = generateUserId();
        } while (await prisma.user.findUnique({ where: { customUserId } }));

        const newUser = await prisma.user.create({
            data: {
                email,
                customUserId,
                fullName: userDetails.fullName,
                phoneNumber: userDetails.phoneNumber,
                profilePhoto: imageLinks[0],
                aboutYou: userDetails.aboutYou,
                story: userDetails.story,
                howLong: userDetails.howLong.toString(),
                danceType: userDetails.danceType,
                discover: userDetails.discover,
                why: userDetails.why,
                danceVideo: imageLinks[1]
            }
        });

        const emailTemplate = await render(RegisterTemplate({ name: userDetails.fullName }));
        await sendEmail({ to: email, subject: "Successful Registration", html: emailTemplate });
        await sendEmail({
            to: adminEmail,
            subject: "New Registration",
            html: `
                <p>A contestant with name <strong>${userDetails.fullName}</strong> and email: ${email} just registered.</p>
                <p>Please log in to your admin dashboard to confirm.</p>
            `
        });

        return NextResponse.json(newUser);

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}