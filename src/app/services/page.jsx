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
import { Eye } from "lucide-react";
import { RedDot, GreenDot } from "../elements/elements";
import {
  databaseId,
  tableClientsId,
  tableServiceCategoryId,
  tableServicesId,
} from "../lib/constants";

export default async function ServicesPage() {
  const services = await tablesDB.listRows({
    databaseId: databaseId,
    tableId: tableServicesId,
  });

  // Function to get the Dates
  const getDate = (date) => {
    const d = new Date(date).toDateString();
    return d;
  };
  // Function to get the Category Name
  const getCategoryName = async (id) => {
    try {
      const result = await tablesDB.getRow({
        databaseId: databaseId,
        tableId: tableServiceCategoryId,
        rowId: id,
      });
      const name = result.category_title;
      return name;
    } catch (error) {
      console.log("Error on fetching category name", error.message);
    }
  };
  // Function to get the Client Name & Surname
  const getClientName = async (id) => {
    try {
      const result = await tablesDB.getRow({
        databaseId: databaseId,
        tableId: tableClientsId,
        rowId: id,
      });
      const name = result.name;
      const surname = result.surname;
      return name + " " + surname;
    } catch (error) {
      console.log("Error on fetching category name", error.message);
    }
  };
  // Functions to compare Dates and Get Final Status
  const today = new Date();
  const expired = (date) => new Date(date);

  if (services?.rows.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-8">
        <h1 className="mb-4 text-2xl font-bold">All Services </h1>
        Nothing to show here yet!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">All Services </h1>
      <Table>
        <TableCaption>A list of all services</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Starting Date</TableHead>
            <TableHead>Expiration Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.rows.map((service) => {
            return (
              <TableRow key={service?.$id}>
                <TableCell className="text-left">
                  <Link
                    href={`/clients/${service?.client_id}`}
                    className="font-bold text-blue-400 flex flex-row"
                  >
                    <Eye className="mr-0.5" />{" "}
                    {getClientName(service?.client_id)}
                  </Link>
                </TableCell>
                <TableCell>
                  {getCategoryName(service?.service_category_id)}
                </TableCell>
                <TableCell>{service?.description}</TableCell>
                <TableCell>{getDate(service?.date_from)}</TableCell>
                <TableCell>{getDate(service?.date_to)}</TableCell>
                <TableCell>{service?.price} €</TableCell>
                <TableCell>
                  {today > expired(service?.date_to) ? RedDot() : GreenDot()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
