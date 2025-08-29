"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../lib/appwrite";
import { tablesDB } from "../lib/appwrite_client";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  async function getClients() {
    const result = await tablesDB.listRows({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_CLIENTS_ID,
    });

    setClients(result.rows);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.$id}>
              {client?.name} {client?.surname} {client?.landline}{" "}
              {client?.mobile} {client?.address}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
