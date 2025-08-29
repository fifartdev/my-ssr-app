import { tablesDB } from "@/app/lib/appwrite_client";
import React from "react";

async function ClientPage({ params }) {
  const client = await tablesDB.getRow({
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_CLIENTS_ID,
    rowId: params.id,
  });

  return <div>ClientPage {client.name}</div>;
}

export default ClientPage;
