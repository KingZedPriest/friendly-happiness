import { NextResponse, type NextRequest } from "next/server";
import { EdgeLogger } from "nexlog/edge";
import { cookies } from 'next/headers'
import { permanentRedirect, RedirectType } from 'next/navigation';

//Utils
import { verifySession } from "@/utils/token.utils";

const logger = new EdgeLogger({
  structured: true,
  sanitize: true,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log request
  logger.info("Request received", {
    path: pathname,
    method: request.method,
    userAgent: request.headers.get("user-agent"),
  });

  try {
    const token = (cookies()).get('session')?.value

    if (!token) {
      logger.warn("Unauthorized: No token");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userDetails = await verifySession(token)
    if (!userDetails) return permanentRedirect("/", RedirectType.replace)

    return NextResponse.next();

  } catch (err) {
    logger.error("Middleware error", { error: String(err) });
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
