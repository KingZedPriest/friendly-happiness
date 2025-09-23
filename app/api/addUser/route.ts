import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prismadb";
import logger from 'nexlog';


//Libs, Utils and Templates
import { s3, config } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { generateUserId } from "@/utils/generate";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/components";
import RegisterTemplate from "@/emails/Registration";


export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const userDetails = JSON.parse(formData.get("userDetails") as string);
        const videoFile = formData.get("danceVideo") as File | null;

        if (!videoFile) {
            return NextResponse.json({ error: "Dance video is required." }, { status: 400 });
        }

        //  === Uniqueness checks ===
        const email = userDetails.emailAddress.toLowerCase();
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists." }, { status: 409 });
        }

        // === Create CustomId === 
        let customUserId: string;
        do {
            customUserId = generateUserId();
        } while (await prisma.user.findUnique({ where: { customUserId } }));

        // === Upload to S3 ===
        const arrayBuffer = await videoFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileKey = `${customUserId}-${uuidv4()}.mp4`;

        await s3.send(
            new PutObjectCommand({
                Bucket: config.bucket,
                Key: fileKey,
                Body: buffer,
                ContentType: videoFile.type,
            })
        );

        const publicUrl = `https://${config.bucket}.s3.${config.region}.amazonaws.com/${fileKey}`;

        // === Save User ===
        const newUser = await prisma.user.create({
            data: {
                email,
                customUserId,
                fullName: userDetails.fullName,
                phoneNumber: userDetails.phoneNumber,
                story: userDetails.story,
                danceVideo: publicUrl,
            },
        });

        // === Emails ===
        const emailTemplate = await render(RegisterTemplate({ name: userDetails.fullName }));
        await sendEmail({ to: email, subject: "Successful Registration", html: emailTemplate });

        await sendEmail({
            to: process.env.EMAIL_NOTIFICATION ?? "goldnueltalents@gmail.com",
            subject: "New Registration",
            html: `<p>${userDetails.fullName} (${email}) just registered.</p>`,
        });

        return NextResponse.json(newUser);
    } catch (err) {
        logger.fatal('Registration error', { whatWentWrong: err })
        console.error("Error creating user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
