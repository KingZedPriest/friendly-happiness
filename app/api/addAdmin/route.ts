import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

//Libs, Schemas, Utils
import { encryptPassword } from '@/utils/token.utils';

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {

        const { email, encryptedPassword, suspended, role } = body;

        //Fetch the admin using their email
        const admin = await prisma.admin.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        //Throw an error if the admin exists
        if (admin) return new NextResponse('An admin with the email exists.', { status: 409 });

        //Hash the password
        const hashedPassword = await bcrypt.hash(encryptedPassword, 12);

        //Encrypt the password
        const newEncryptedPassword = encryptPassword(encryptedPassword)

        //Create new admin account
        const newAdmin = await prisma.admin.create({
            data: {
                email: email.toLowerCase(),
                hashedPassword,
                encryptedPassword: newEncryptedPassword,
                suspended,
                role
            }
        })

        //Revalidate the path
        revalidatePath('/admin/staff');
        return NextResponse.json(newAdmin);

    } catch (error) {
        console.log("Error creating Admin:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}