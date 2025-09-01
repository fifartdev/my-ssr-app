"use client";
import { tablesDB } from "@/app/lib/appwrite_client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";

function EditServiceCategoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getServicesCategories = async () => {
      try {
        const result = await tablesDB.listRows({
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          tableId:
            process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES_CATEGORIES_ID,
        });
        setCategories(result.rows);
      } catch (error) {
        console.log("Error fetching categories", error.message);
      }
    };
    getServicesCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleCreateServiceCategory = async (e) => {
    e.preventDefault();
    if (
      categories.some(
        (cat) => cat.category_title.toLowerCase() === title.toLowerCase()
      )
    ) {
      alert("This category title already exists.");
      return;
    }
    try {
      await tablesDB.upsertRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES_CATEGORIES_ID,
        rowId: ID.unique(),
        data: {
          category_title: title,
        },
      });
      router.push("/service-categories");
    } catch (error) {
      console.log("Error creating service category ", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Add New Service Category</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleCreateServiceCategory}
      >
        <Input
          type="text"
          name="title"
          placeholder="Service Category"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>

      <Button
        onClick={() => router.back()}
        type="submit"
        className="mt-4 w-full"
        variant={"outline"}
      >
        Cancel
      </Button>
    </div>
  );
}

export default EditServiceCategoryPage;
