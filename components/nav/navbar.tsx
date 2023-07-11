import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";

import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import { MainNav } from "@/components/nav/main-nav";
import { CategoriesNav } from "./categories-nav";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-2">
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
          <div className="hidden md:block">
            <StoreSwitcher items={stores} />
          </div>
        </div>

        <MainNav />
      </div>
      <div className="hidden md:block">
        <CategoriesNav />
      </div>
    </nav>
  );
};

export default Navbar;
