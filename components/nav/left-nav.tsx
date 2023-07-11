"use client";

import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import StoreSwitcher from "@/components/store-switcher";
import { SideNav } from "./side-nav";

export function LeftNav() {
  return (
    <>
      <SideNav />
      <a href="https://flowbite.com/">
        <div className="flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2374/2374896.png"
            className="h-8 mr-0.5 mt-[-0.1rem]"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            RafflePh
          </span>
        </div>
      </a>
    </>
  );
}
