'use server';
import { db } from '@/lib/db';

export async function fetchEmployeesAction() {

    try {
        const result = await db.execute("SELECT * FROM employees ORDER BY first_name ASC");

        const plainEmployees = result.rows.map((row: { id: number; first_name: string; last_name: string; email: string; department: string; }) => ({
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            department: row.department
        }));

        return { success: true, data: plainEmployees };
    } catch (error) {
        console.error("Fetch Error", error);
        return { success: false, data: [] };
    }

}