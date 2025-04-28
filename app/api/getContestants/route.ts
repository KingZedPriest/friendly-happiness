import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const [contestants, total] = await Promise.all([
            prisma.user.findMany({
                where: {
                    hasPaid: true,
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),
            prisma.user.count({ where: { hasPaid: true } }),
        ]);

        return NextResponse.json({
            data: contestants,
            meta: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            },
        });
    } catch (error) {
        console.log("Error Fetching Contestants", error);
        return NextResponse.json(
            { error: "Couldn't fetch contestants details, kindly try again" },
            { status: 500 }
        );
    }
}
