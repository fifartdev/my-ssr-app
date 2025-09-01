"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ID } from "appwrite";
import { tablesDB } from "@/app/lib/appwrite_client";
import { useRouter } from "next/navigation";
import { databaseId, tableClientsId } from "@/app/lib/constants";

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
        databaseId: databaseId,
        tableId: tableClientsId,
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
          pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9._%+\-]+\.[a-zA-Z]{2,}$"
        />
        <Input
          type="text"
          name="landline"
          value={landline}
          placeholder="Landline"
          onChange={(e) => setLandline(e.target.value)}
          pattern="^[0-9]+$"
        />
        <Input
          type="text"
          name="mobile"
          value={mobile}
          placeholder="Mobile"
          onChange={(e) => setMobile(e.target.value)}
          pattern="^[0-9]+$"
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
