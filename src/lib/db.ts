import { createClient } from "@libsql/client";

// This connects to a local file. No C++ bindings required!
export const db = createClient({
  url: "file:kinship.db",
});

// Create the table if it doesn't exist
async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      department TEXT
    )
  `);
}

initDb().catch(console.error);