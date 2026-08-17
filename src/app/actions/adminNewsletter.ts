"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function unsubscribeUser(id: string) {
  try {
    await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status: "UNSUBSCRIBED" },
    });
    
    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing user:", error);
    return { error: "Failed to unsubscribe user" };
  }
}

export async function resubscribeUser(id: string) {
  try {
    await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status: "ACTIVE" },
    });
    
    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch (error) {
    console.error("Error resubscribing user:", error);
    return { error: "Failed to resubscribe user" };
  }
}
