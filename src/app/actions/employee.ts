"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { departmentSelectionOptions } from "../components/AddEmployeeForm";

export async function addEmployee(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const department = formData.get("department") as string;

  //Server-side validation Logic

  if (!firstName || firstName.length < 2) {
    return {
      success: false,
      error: "First name needs to be more than 2 characters long."
    }
  }

  if (!lastName || lastName.length < 2) {
    return {
      success: false,
      error: "Last name needs to be more than 2 characters long."
    }
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !regex.test(email)) {
    return {
      success: false,
      error: "Please use the following format for an email 'hello@world.com'"
    }
  }

  if(!department || !departmentSelectionOptions.includes(department)){
    return {
      success: false,
      error: "Please select a valid department option."
    }
  }

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