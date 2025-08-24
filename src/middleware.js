import { NextResponse } from "next/server";
import { getLoggedInUser } from "./app/lib/appwrite";

export async function middleware(request) {
  console.log("middleware ran");
  console.log("ENDPOINT IS: ", process.env.APPWRITE_ENDPOINT);
  console.log("PROJECT IS: ", process.env.APPWRITE_PROJECT);
  console.log("API_KEY IS: ", process.env.APPWRITE_KEY);

  const url = new URL(request.url);
  const pathname = url.pathname;

  const user = await getLoggedInUser();

  if (!user && pathname !== "/login") {
    // Not authenticated, redirect to login except if already on login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && pathname === "/login") {
    // Authenticated user visiting login page, redirect to account
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // Allow access to other valid requests (e.g., /account if logged in)
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/account"],
};
