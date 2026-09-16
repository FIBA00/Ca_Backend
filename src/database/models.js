import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  phone: text("phone").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", {
    enum: ["user", "staff", "owner", "admin"],
  })
    .notNull()
    .default("user"),
  shopId: uuid("shopId").references(() => shops.id),
  emailVerified: boolean("email_verified").notNull().default(false),
  phoneVerified: boolean("phone_verified").notNull().default(false),
  address: text("address"),
  tokenVersion: integer("token_version").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shops = pgTable("shops", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  status: text("status", {
    enum: ["pending", "approved", "rejected", "suspended"],
  })
    .notNull()
    .default("pending"),
  address: text("address").notNull(),
  proofDocumentUrl: text("proof_document_url"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  ownerName: text("order_owner_name").notNull(),
  phone: text("phone").notNull(),
  shopId: uuid("shopId")
    .notNull()
    .references(() => shops.id),
  address: text("address").notNull(),
  status: text("status", {
    enum: ["recieved", "confirmed", "processing", "ready", "delivered"],
  })
    .notNull()
    .default("received"),
  createdAt: timestamp("created_at").defaultNow(),
});
