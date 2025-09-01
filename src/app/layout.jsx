import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { getLoggedInUser, createSessionClient } from "./lib/appwrite";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import NavigationMenuMain from "./my-components/NavigationMenuMain";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My SSR App",
  description: "My Next Appwrite SSR App",
};

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  (await cookies()).delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/login");
}

export default async function RootLayout({ children }) {
  const user = await getLoggedInUser();
  //console.log("User is:", user);

  return (
    <html lang="en">
      <body className="antialiased px-4">
        {user && <NavigationMenuMain signout={signOut} />}
        {children}
      </body>
    </html>
  );
}
