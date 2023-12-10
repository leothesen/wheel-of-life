// Adapted model schema for PostgreSQL using NeonDB
// Importing PostgreSQL-specific types and utilities from NeonDB

import { sql } from "drizzle-orm";
import {
  serial,
  index,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Adaptation for PostgreSQL using NeonDB. This example assumes the usage of similar
 * functionalities in NeonDB as in Drizzle ORM for MySQL.
 */
export const postgresTable = pgTableCreator((name) => `wheel-of-life_${name}`);

export const posts = postgresTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);
