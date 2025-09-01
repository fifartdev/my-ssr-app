import { tablesDB } from "@/app/lib/appwrite_client";
import React from "react";
import {
  CardContent,
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Query } from "appwrite";
import { GreenDot, RedDot } from "@/app/elements/elements";
import {
  databaseId,
  tableClientsId,
  tableServiceCategoryId,
  tableServicesId,
} from "@/app/lib/constants";
import { Pencil } from "lucide-react";

async function ClientPage({ params }) {
  const { id } = await params;
  //Get Client
  const client = await tablesDB.getRow({
    databaseId: databaseId,
    tableId: tableClientsId,
    rowId: id,
  });
  //Get Services of the Client
  const services = await tablesDB.listRows({
    databaseId: databaseId,
    tableId: tableServicesId,
    queries: [Query.equal("client_id", id)],
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
  // Functions to compare Dates and Get Final Status
  const today = new Date();
  const expired = (date) => new Date(date);

  return (
    <div className="max-w-7xl mx-auto mt-8 justify-center ">
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle>Client Account Page</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3 md:flex-row md:gap-6">
            <li>
              <strong>Full Name:</strong> {client?.name} {client.surname}
            </li>
            <li>
              <strong>Email:</strong> {client?.email}
            </li>

            <li>
              <strong>Landline: </strong> {client?.landline}
            </li>
            <li>
              <strong>Mobile: </strong> {client?.mobile}
            </li>
          </ul>
          <ul className="flex flex-col gap-3 md:flex-row md:gap-6 mt-2">
            <li>
              <strong>Full Address: </strong> {client?.address}
            </li>
          </ul>
          <CardFooter className="flex flex-row mt-8">
            <Button>
              <Link
                href={{
                  pathname: "/services/new",
                  query: { id: client?.$id },
                }}
              >
                Add Service
              </Link>
            </Button>
            <Button className="mx-1" variant={"outline"}>
              <Link href={`/clients/edit/${client?.$id}`}>Edit Client</Link>
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Client's Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List of Services</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">Service</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Client Satus</TableHead>
                <TableHead>Service Satus</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.rows.map((service) => {
                return (
                  <TableRow key={service?.$id}>
                    <TableCell className="w-[200px] font-bold">
                      {getCategoryName(service?.service_category_id)}
                    </TableCell>
                    <TableCell>{service?.description}</TableCell>
                    <TableCell>{getDate(service?.date_from)}</TableCell>
                    <TableCell>{getDate(service?.date_to)}</TableCell>
                    <TableCell>{service?.price} €</TableCell>
                    <TableCell>{service?.status}</TableCell>
                    <TableCell>
                      {today > expired(service?.date_to)
                        ? RedDot()
                        : GreenDot()}
                    </TableCell>
                    <TableCell className="text-left">
                      <Link
                        href={`/services/${service?.$id}`}
                        className="font-bold text-green-500 flex flex-row"
                      >
                        <Pencil />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ClientPage;
