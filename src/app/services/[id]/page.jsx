"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ID } from "appwrite";
import { tablesDB } from "@/app/lib/appwrite_client";
import { useRouter, useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  databaseId,
  tableServiceCategoryId,
  tableServicesId,
} from "@/app/lib/constants";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Services Categories
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const result = await tablesDB.listRows({
        databaseId,
        tableId: tableServiceCategoryId,
      });
      setCategories(result.rows);
    } catch (error) {
      console.log("Error on fetching services categories", error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  // Service Fields
  const [service, setService] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [client, setClient] = useState(null);

  function stringToFloat(str) {
    return parseFloat(str);
  }

  function formatDateToYYYYMMDD(dateInput) {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Fetch service data when component mounts
  useEffect(() => {
    const getService = async () => {
      try {
        const response = await tablesDB.getRow({
          databaseId,
          tableId: tableServicesId,
          rowId: id,
        });
        setService(response);
      } catch (error) {
        console.log("Error fetching service to update", error.message);
      }
    };
    getService();
  }, [id]);

  // Update form state when service data changes
  useEffect(() => {
    if (!service || categories.length === 0) return;
    setStartDate(formatDateToYYYYMMDD(service.date_from));
    setExpDate(formatDateToYYYYMMDD(service.date_to));
    setStatus(service.status || "");
    setDescription(service.description || "");
    setPrice(service.price || 0);
    setClient(service.client_id || null);

    if (
      service.service_category_id &&
      categories.some((c) => c.$id === service.service_category_id)
    ) {
      setCategory(service.service_category_id);
    }
  }, [service, categories]);

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!category) {
      setError("Please select a service category.");
      return;
    }
    setError("");

    const expDateObj = new Date(expDate);
    const today = new Date();
    if (expDateObj <= today) {
      setError("Please select a future date for Expiration Date.");
      return;
    }
    setError("");

    try {
      await tablesDB.updateRow({
        databaseId,
        tableId: tableServicesId,
        rowId: id,
        data: {
          date_from: startDate,
          date_to: expDate,
          client_id: client,
          service_category_id: category,
          description,
          status,
          price: stringToFloat(price),
        },
      });
      router.push(`/clients/${client}`);
    } catch (error) {
      console.log("Error updating Service", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Edit Service</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdateService}>
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
        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger>
            <SelectValue placeholder="Client Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"Active"}>Active</SelectItem>
            <SelectItem value={"Nonactive"}>Nonactive</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          name="description"
          value={description}
          placeholder="Fill in a service description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          name="price"
          value={price}
          placeholder="€"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Select
          onValueChange={(value) => setCategory(value)}
          value={category}
          disabled={categories?.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a service Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.$id} value={c.$id}>
                {c.category_title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-red-600 mt-1">{error}</p>}
        <Button type="submit" className="mt-4">
          Update
        </Button>
      </form>
      <Button
        onClick={() => router.back()}
        className="mt-4 w-full"
        variant={"outline"}
      >
        Back
      </Button>
    </div>
  );
}
