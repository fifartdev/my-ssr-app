import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "../lib/appwrite";
import { createAdminClient } from "../lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ID } from "node-appwrite";
import Link from "next/link";

async function signUpWithEmail(formData) {
  "use server";
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/account");
  } catch (error) {
    console.error(error);
    if (error.code === 401 || 400) {
      redirect("/signup?error=1");
    }
  }
}

export default async function SignUp({ searchParams }) {
  const user = await getLoggedInUser();
  if (user) redirect("/account");
  const error = (await searchParams)?.error;
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <form action={signUpWithEmail} className="space-y-4 max-w-sm w-full">
        <Input id="name" name="name" placeholder="Name" type="text" required />
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <Input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
          required
        />
        <Button className="w-full">Sign Up</Button>
      </form>
      <div className="space-y-4 max-w-sm w-full mt-4">
        <Button asChild className="w-full" variant="outline">
          <Link href="/login">Already have an account? Log In</Link>
        </Button>
      </div>
      {error && (
        <Alert variant="default" className="absolute bottom-4">
          <AlertDescription>
            Something Went wrong. Please try again!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
