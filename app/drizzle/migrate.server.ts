import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { z } from "zod";
import * as schema from "./schema.server";

export const MigrateScriptSchema = z.object({
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  INSTANCE_UNIX_SOCKET: z.string().optional(),
  APP_ENV: z.union([
    z.literal("PRODUCTION"),
    z.literal("STAGE"),
    z.literal("DEVELOPMENT"),
  ]),
});

async function main() {
  const data = MigrateScriptSchema.parse(process.env);

  console.log("Migration data: \n", data);

  const connection = await mysql.createConnection({
    user: data.DATABASE_USERNAME, // e.g. 'my-db-user'
    password: data.DATABASE_PASSWORD, // e.g. 'my-db-password'
    database: data.DATABASE_NAME, // e.g. 'my-database'
    ...(data.APP_ENV === "DEVELOPMENT"
      ? {
          host: "127.0.0.1",
        }
      : {
          socketPath: data.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
        }),
  });

  const db = drizzle(connection, { schema, mode: "default" });

  await migrate(db, { migrationsFolder: "app/drizzle/migrations" });

  console.log("🌿 Seeding database");

  await db
    .insert(schema.countries)
    .values({
      id: 1,
      name: "USA",
    })
    .onDuplicateKeyUpdate({
      set: {
        id: 1,
        name: "USA",
      },
    });

  await db
    .insert(schema.countries)
    .values({
      id: 2,
      name: "Kyrgyzstan",
    })
    .onDuplicateKeyUpdate({
      set: {
        id: 2,
        name: "Kyrgyzstan",
      },
    });

  await db
    .insert(schema.users)
    .values({
      id: 1,
      email: "erlan@remix.run",
      password: "!StrongPassword01",
    })
    .onDuplicateKeyUpdate({
      set: {
        id: 1,
        email: "erlan@remix.run",
        password: "!StrongPassword01",
      },
    });
}

main();
