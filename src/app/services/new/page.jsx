"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ID } from "appwrite";
import { tablesDB } from "@/app/lib/appwrite_client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewServicePage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  //Services Categories
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const result = await tablesDB.listRows({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES_CATEGORIES_ID,
      });
      setCategories(result.rows);
    } catch (error) {
      console.log("Error on fetching services categories", error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  //End of Services Categories
  // Service Fields
  const [startDate, setStartDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateNewService = async (e) => {
    e.preventDefault();
    if (!category) {
      setError("Please select a service category.");
      return;
    }
    setError("");

    const futureDate = new Date(expDate).toISOString();
    const today = new Date().toISOString();
    if (today > futureDate) {
      setError("Please select Date in the Future for Expiration Date.");
      return;
    }
    setError("");

    try {
      await tablesDB.upsertRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES,
        rowId: ID.unique(),
        data: {
          date_from: startDate,
          date_to: expDate,
          client_id: id,
          service_category_id: category,
          status: status,
        },
      });
      router.push(`/clients/${id}`);
    } catch (error) {
      console.log("Error adding new Service", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Add Service</h1>
      <form className="flex flex-col gap-4" onSubmit={handleCreateNewService}>
        <Label htmlFor="startDate">Starting Date</Label>
        <Input
          type="date"
          name="startDate"
          value={startDate}
          placeholder="Starting Date"
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Label htmlFor="expDate">Expiration Date</Label>
        <Input
          type="date"
          name="expDate"
          value={expDate}
          placeholder="Expiration Date"
          onChange={(e) => setExpDate(e.target.value)}
          required
        />
        <Select
          onValueChange={(value) => setStatus(value)}
          defaultValue={status}
        >
          <SelectTrigger>
            <SelectValue placeholder="Client Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={"Active"}>Active</SelectItem>
            <SelectItem value={"Nonactive"}>Nonactive</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setCategory(value)} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service Category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((c) => {
              return (
                <SelectItem key={c.$id} value={c.$id}>
                  {c.category_title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {error && <p className="text-red-600 mt-1">{error}</p>}
        <Button type="submit" className="mt-4">
          Add
        </Button>
      </form>
    </div>
  );
}
