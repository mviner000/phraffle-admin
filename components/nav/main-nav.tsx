"use client";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchInput } from "../ui/search-input";
import { SideNav } from "./side-nav";

export function MainNav() {
  return (
    <>
      <div className="md:hidden">
        <SideNav />
      </div>

      <div className="hidden md:block">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <SearchInput type="search" />
          <Button type="submit">Search</Button>
        </div>
      </div>
      <div
        className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1"
        id="navbar-user"
      >
        <div className="ml-auto flex items-center space-x-2">
          <div>
            <ThemeToggle />
          </div>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
}
