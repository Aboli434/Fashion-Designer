"use server";

import { prisma } from "@/lib/prisma";

export async function submitContact(formData: FormData) {
  const name = formData.get("user_name") as string;
  const email = formData.get("user_email") as string;
  const message = formData.get("message") as string;
  const projectType = formData.get("project_type") as string;
  const budget = formData.get("budget") as string;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  try {
    const fullMessage = `Inquiry Type: ${projectType || 'Not specified'}\nBudget: ${budget || 'Not specified'}\n\nMessage:\n${message}`;

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message: fullMessage,
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to save contact submission", error);
    return { error: "Failed to submit request" };
  }
}
