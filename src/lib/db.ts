import { createClient } from "@libsql/client";

// This connects to a local file. No C++ bindings required!
export const db = createClient({
  url: `file:${process.cwd()}/kinship.db`,
});

// Create the table if it doesn't exist
async function initDb() {
  //Employees table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      department TEXT
    )
  `);

  //New Users table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL, -- This will store the hashed password
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initDb().catch(console.error);