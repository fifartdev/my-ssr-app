import React from "react";
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
import { tablesDB } from "../lib/appwrite_client";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

async function ServiceCategoriesPage() {
  const response = await tablesDB.listRows({
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES_CATEGORIES_ID,
  });

  if (!response) {
    console.log("Error fetching services categories");
    return;
  }
  const servicesCatgeories = response.rows;

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">All Service Categories </h1>
      <Link href={"/service-categories/new"}>
        <Button>Add New Category</Button>
      </Link>
      <Table>
        <TableCaption>A list of all Service Categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicesCatgeories.map((serviceCat) => {
            return (
              <TableRow key={serviceCat?.$id}>
                <TableCell className="text-left">
                  {serviceCat?.category_title}
                </TableCell>
                <TableCell className="text-green-500">
                  <Link href={`/service-categories/${serviceCat?.$id}`}>
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

export default ServiceCategoriesPage;
