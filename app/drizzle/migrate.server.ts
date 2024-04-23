import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";
import { z } from "zod";

import * as schema from "./schema.server";

export const MigrateScriptSchema = z.object({
  DB_URL: z.string(),
  DB_AUTH_TOKEN: z.string(),

  APP_ENV: z.union([
    z.literal("PRODUCTION"),
    z.literal("STAGE"),
    z.literal("DEVELOPMENT"),
  ]),
});

async function main() {
  const data = MigrateScriptSchema.parse(process.env);

  console.log("Migration data: \n", data);

  const client = createClient({
    url: data.DB_URL,
    authToken: data.DB_AUTH_TOKEN,
  });

  const db = drizzle(client, { schema });

  await migrate(db, { migrationsFolder: "app/drizzle/migrations" });

  console.log("🌿 Seeding database");

  await db
    .insert(schema.countries)
    .values({
      id: 1,
      name: "USA",
    })
    .onConflictDoNothing();

  await db
    .insert(schema.countries)
    .values({
      id: 2,
      name: "Kyrgyzstan",
    })
    .onConflictDoNothing();

  await db
    .insert(schema.users)
    .values({
      id: 1,
      email: "erlan@remix.run",
      password: "!StrongPassword01",
    })
    .onConflictDoNothing();
}

main();
