"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function NavigationMenuMain({ signout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-center border-b p-4">
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden p-2 mr-4"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList
          className={`flex flex-col gap-2 md:flex-row md:gap-4 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/account">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>All Clients</NavigationMenuTrigger>
            <NavigationMenuContent className="w-full md:w-50 p-4">
              <NavigationMenuLink
                asChild
                className="w-full md:w-auto mb-2 md:mb-0"
              >
                <Link href="/clients">Clients</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className="w-full md:w-auto">
                <Link href="/clients/new">New Client</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/services">Services</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/service-categories">Service Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <form action={signout} className="max-w-sm w-full">
                <Button type="submit">Sign out</Button>
              </form>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
