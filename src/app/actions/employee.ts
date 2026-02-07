"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addEmployee(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const department = formData.get("department") as string;

  try {
    await db.execute({
      sql: "INSERT INTO employees (first_name, last_name, email, department) VALUES (?, ?, ?, ?)",
      args: [firstName, lastName, email, department],
    });
    
    revalidatePath("/organization");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false };
  }
}