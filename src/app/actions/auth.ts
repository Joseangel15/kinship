"use server";

import { db } from '@/lib/db';
import { hash } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic validation
    if (!name || !email || password.length < 6) {
        return { success: false, error: "Invalid input. Password must be 6+ chars." }
    }

    try {
        // Hash the password using 10 salt rounds
        const hashedPassword = await hash(password, 10);

        // Insert into the database
        await db.execute({
            sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            args: [name, email, hashedPassword],
        });
    } catch (e: any) {
        if (e.message?.includes("UNIQUE constraint failed")) {
            return { success: false, error: "Email already registered." };
        }
        return { success: false, error: "Something went wrong." };
    }

    //Redirect to login after successful signup
    redirect("/login");
}