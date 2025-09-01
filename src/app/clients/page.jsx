import React from "react";
import { tablesDB } from "../lib/appwrite_client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Search, Pencil } from "lucide-react";
import { databaseId, tableClientsId } from "../lib/constants";

export default async function ClientsPage() {
  const clients = await tablesDB.listRows({
    databaseId: databaseId,
    tableId: tableClientsId,
  });

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">All Clients</h1>
      <Table>
        <TableCaption>A list of your clients</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Landline</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>View</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.rows.map((client) => {
            return (
              <TableRow key={client?.$id}>
                <TableCell>{client?.$id.slice(0, 6)}</TableCell>
                <TableCell>{client?.name}</TableCell>
                <TableCell>{client?.surname}</TableCell>
                <TableCell>{client?.email}</TableCell>
                <TableCell>{client?.landline}</TableCell>
                <TableCell>{client?.mobile}</TableCell>
                <TableCell className="text-left">{client?.address}</TableCell>
                <TableCell className="text-left">
                  <Link
                    href={`/clients/${client?.$id}`}
                    className="font-bold text-blue-400"
                  >
                    <Search />
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Link
                    href={`/clients/edit/${client?.$id}`}
                    className="font-bold text-green-400"
                  >
                    <Pencil />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
