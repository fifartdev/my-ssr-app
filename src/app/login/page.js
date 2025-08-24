import { getLoggedInUser } from "../lib/appwrite";
import { createAdminClient } from "../lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loginWithEmail(formData) {
  "use server";
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/account");
  } catch (error) {
    console.error(error);
    redirect("/login?error=1");
  }
}

export default async function Login({ searchParams }) {
  const user = await getLoggedInUser();
  if (user) redirect("/account");
  const error = searchParams?.error;
  return (
    <>
      <form action={loginWithEmail}>
        <input id="email" name="email" placeholder="Email" type="email" />
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
        />
        <button type="submit">Login</button>
      </form>
      {error && (
        <p className="text-red-700">Something went Wrong. Please try again!</p>
      )}
    </>
  );
}
