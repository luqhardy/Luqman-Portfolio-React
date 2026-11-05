import { NextResponse, type NextRequest } from "next/server";

/** jp.luqmanhadi.com serves the Japanese museum from the same deployment. */
const JAPANESE_HOSTS = new Set(["jp.luqmanhadi.com", "jp.localhost"]);

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];
  if (!JAPANESE_HOSTS.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/japanese";
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/"] };
