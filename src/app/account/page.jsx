// src/app/account/page.jsx

import { createSessionClient, getLoggedInUser } from "../lib/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  (await cookies()).delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/login");
}

export default async function AccountPage() {
  const user = await getLoggedInUser();
  // if (!user) redirect("/login");

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-6">
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>ID: </strong> {user.$id}
            </li>
          </ul>
          <CardFooter className="mt-8">
            <form action={signOut} className="space-y-4 max-w-sm w-full">
              <Button type="submit">Sign out</Button>
            </form>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
