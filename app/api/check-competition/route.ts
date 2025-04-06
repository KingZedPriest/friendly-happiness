import { NextResponse } from 'next/server';
import checkCompetition from '@/actions/server/checkCompetition';

export async function GET() {
    const result = await checkCompetition();
    return NextResponse.json(result);
}
