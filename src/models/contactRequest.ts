'use server';

import db from "~/lib/db";
import { ContactRequestsTable, NewContactRequest } from "~/lib/db.schema";

export async function createContactRequest(newContactRequest: NewContactRequest) {
    const contactRequest = await db
        .insert(ContactRequestsTable)
        .values(newContactRequest)
        .returning();

    return contactRequest;
}