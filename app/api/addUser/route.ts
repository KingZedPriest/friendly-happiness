import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import axios from "axios";
import { render } from "@react-email/components";

//Utils, Actions, Templates
import { generateUserId } from "@/utils/generate";
import { sendEmail } from "@/lib/email";
import RegisterTemplate from "@/emails/Registration";


export async function POST(request: NextRequest) {

    const secretKey = process.env.LIVE_SECRET_KEY
    const body = await request.json()

    try {

        const { transactionId, userDetails, imageLinks } = body;

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${transactionId}`, {
            headers: { Authorization: `Bearer ${secretKey}` }
        });


        if (response.data.status && response.data.data.status === "success") {

            const email = userDetails.emailAddress.toLowerCase();

            //Check if user exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return NextResponse.json({ error: "A user with this email exists, kindly try with another email address." }, { status: 409 });
            }

            //Generate CustomUserId
            let customUserId: string;
            do {
                customUserId = generateUserId();
            } while (await prisma.user.findUnique({ where: { customUserId } }));

            //Create new user
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

            //Send Email
            const emailTemplate = await render(RegisterTemplate({ name: userDetails.fullName }));
            await sendEmail({ to: email, subject: "Successful Registration", html: emailTemplate });

            return NextResponse.json(newUser);
        }

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}