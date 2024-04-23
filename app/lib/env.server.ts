import { z } from "zod";

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  APP_ENV: z.enum(["PRODUCTION", "STAGE", "DEVELOPMENT"]),

  DB_URL: z.string(),
  DB_AUTH_TOKEN: z.string(),
});

export const env = EnvironmentSchema.parse(process.env);
