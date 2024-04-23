import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// declaring enum in database
export const countries = sqliteTable(
  "countries",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
  },
  (countries) => ({
    nameIndex: uniqueIndex("name_idx").on(countries.name),
  })
);

export const cities = sqliteTable("cities", {
  id: integer("id").primaryKey(),
  name: text("name"),
  countryId: integer("country_id").references(() => countries.id),
  popularity: text("popularity", { enum: ["unknown", "known", "popular"] }),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});
