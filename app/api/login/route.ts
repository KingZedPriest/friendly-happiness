import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

//Utils
import { signSession } from '@/utils/token.utils';


export async function POST(request: NextRequest) {

    const body = await request.json();
    const cookieStore = cookies()

    try {

        const { email, password } = body;

        const lowerCaseEmail = email.toLowerCase()

        //Fetch the admin using their email
        const admin = await prisma.admin.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })

        //Throw an error if the admin does not exist
        if (!admin) return new NextResponse('Wrong Email or Password.', { status: 400 })

        //Compare passwords
        const isCorrect = await bcrypt.compare(password, admin.hashedPassword!)
        if (!isCorrect) return new NextResponse('Wrong Email or Password', { status: 400 })

        //Convert the details as token, and save it as a cookie
        const data = await signSession(admin)

        // Save the admin hashed details as a cookie
        cookieStore.set({
            name: 'session',
            value: data,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "strict",
        });

        return NextResponse.json(admin);

    } catch (error) {

        console.log("Error login in the admin:", error);
        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}