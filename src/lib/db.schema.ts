import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const ContactRequestsTable = pgTable("contact_requests", {
  id: serial("id"),
  contactPerson: text("contactPerson"),
  companyName: text("companyName"),
  email: text("email"),
  phone: text("phone"),
  message: text('message'),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});


export type ContactRequest = InferSelectModel<typeof ContactRequestsTable>
export type NewContactRequest = InferInsertModel<typeof ContactRequestsTable>