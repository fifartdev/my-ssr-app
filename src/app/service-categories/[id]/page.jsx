"use client";
import { tablesDB } from "@/app/lib/appwrite_client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { databaseId, tableServiceCategoryId } from "@/app/lib/constants";

function EditServiceCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await tablesDB.getRow({
          databaseId: databaseId,
          tableId: tableServiceCategoryId,
          rowId: id,
        });
        setCategory(result);
      } catch (error) {
        console.log("Error fetching category", error.message);
      }
    };
    if (id) {
      getCategory();
    }
  }, [id]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category) {
      setTitle(category?.category_title);
    }
  }, [category]);

  const handleUpdateServiceCategory = async (e) => {
    e.preventDefault();
    try {
      await tablesDB.updateRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES_CATEGORIES_ID,
        rowId: id,
        data: {
          category_title: title,
        },
      });
      router.push("/service-categories");
    } catch (error) {
      console.log("Error updating service category ", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Edit Service Category</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleUpdateServiceCategory}
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
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditServiceCategoryPage;
