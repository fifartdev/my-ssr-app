import { Button } from "@/components/ui/button";
import { getLoggedInUser } from "../lib/appwrite";
import { createAdminClient } from "../lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

async function loginWithEmail(formData) {
  "use server";
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const { account } = await createAdminClient();

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
    if (error.code === 401) {
      redirect("/login?error=1");
    }
  }
}

export default async function Login({ searchParams }) {
  const user = await getLoggedInUser();
  if (user) redirect("/account");
  const error = (await searchParams)?.error;
  console.log("ENDPOINT IS: ", process.env.APPWRITE_ENDPOINT);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <form action={loginWithEmail} className="space-y-4 max-w-sm w-full">
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
        <Button className="w-full">Login</Button>
      </form>
      <div className="space-y-4 max-w-sm w-full mt-4">
        <Button asChild className="w-full" variant="outline">
          <Link href="/signup">Don't have an account yet? Sign Up</Link>
        </Button>
      </div>
      {error && (
        <Alert variant="default" className="absolute bottom-4">
          <AlertDescription>
            Email or Password is incorrect. Please try again!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
