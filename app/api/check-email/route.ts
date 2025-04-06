// app/api/check-email/route.ts
import { NextResponse } from 'next/server';
import checkEmail from '@/actions/server/checkEmail';

export async function POST(req: Request) {
    const { email } = await req.json();
    const result = await checkEmail(email);
    return NextResponse.json(result);
}
