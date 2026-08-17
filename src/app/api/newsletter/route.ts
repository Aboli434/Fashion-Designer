import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email minimally
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if it already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "You're already on the list.", isDuplicate: true },
        { status: 409 }
      );
    }

    // Save to database
    await prisma.newsletterSubscriber.create({
      data: { 
        email: normalizedEmail,
        status: "ACTIVE",
        source: "JOURNAL"
      },
    });

    return NextResponse.json(
      { message: "You're on the list." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
