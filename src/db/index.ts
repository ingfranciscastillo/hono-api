import { drizzle } from "drizzle-orm/libsql";

if (!process.env.TURSO_CONNECTION_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Missing TURSO_CONNECTION_URL and/or TURSO_AUTH_TOKEN environment variables");
}

export const db = drizzle({ connection: {
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
}});