"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ID } from "appwrite";
import { tablesDB } from "@/app/lib/appwrite_client";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [landline, setLandline] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tablesDB.upsertRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_CLIENTS_ID,
        rowId: ID.unique(),
        data: { name, surname, email, landline, mobile, address },
      });

      router.push("/clients");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">New Client</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          name="surname"
          value={surname}
          placeholder="Surname"
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          name="landline"
          value={landline}
          placeholder="Landline"
          onChange={(e) => setLandline(e.target.value)}
        />
        <Input
          type="text"
          name="mobile"
          value={mobile}
          placeholder="Mobile"
          onChange={(e) => setMobile(e.target.value)}
        />
        <Input
          type="text"
          name="address"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button type="submit" className="mt-4">
          Create Client
        </Button>
      </form>
    </div>
  );
}
