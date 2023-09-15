// drizzle.config.ts
import type { Config } from "drizzle-kit";


if (!process.env.DB_URL) {
    throw new Error('DB_URL is missing');
}

export default {
    schema: "./src/lib/db.schema.ts",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DB_URL,
    },
} satisfies Config;