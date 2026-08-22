import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "NOT_SET";
  
  // Safely mask the password
  let maskedUrl = dbUrl;
  let errorMsg = null;
  
  try {
    if (dbUrl !== "NOT_SET") {
      const url = new URL(dbUrl);
      url.password = "*****";
      maskedUrl = url.toString();
    }
  } catch (e: any) {
    maskedUrl = "INVALID_URL_FORMAT";
    errorMsg = e.message;
  }

  // Get raw character codes to check for hidden zero-width spaces or newlines
  const charCodes = dbUrl !== "NOT_SET" ? dbUrl.split('').map(c => c.charCodeAt(0)) : [];
  
  return NextResponse.json({
    status: "DEBUG_MODE",
    hasUrl: dbUrl !== "NOT_SET",
    length: dbUrl.length,
    maskedUrl,
    errorMsg,
    startsWithQuote: dbUrl.startsWith('"'),
    endsWithQuote: dbUrl.endsWith('"'),
    hasNewline: dbUrl.includes("\n") || dbUrl.includes("\r"),
    first10Chars: dbUrl.substring(0, 10),
    last5Chars: dbUrl.substring(dbUrl.length - 5),
    charCodes,
  });
}
