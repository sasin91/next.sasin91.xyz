import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const dbUrl = String(process.env.DB_URL);

// for migrations
const migrationClient = postgres(dbUrl, { max: 1 });
migrate(drizzle(migrationClient), {
    migrationsFolder: 'drizzle'
});

// for query purposes
const queryClient = postgres(dbUrl);
const db: PostgresJsDatabase = drizzle(queryClient);

export default db;