import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = 'edge';
export const preferredRegion = 'auto';

// A faulty API route to test Sentry's error monitoring
export function GET() {
  throw new Error("Sentry Example API Route Error");
  return NextResponse.json({ data: "Testing Sentry Error..." });
}
