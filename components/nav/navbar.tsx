import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";

import prismadb from "@/lib/prismadb";
import { MainNav } from "@/components/nav/main-nav";
import { CategoriesNav } from "./categories-nav";
import { LeftNav } from "./left-nav";

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
          <LeftNav />
        </div>

        <MainNav />
      </div>
      <div className="p-4 mt-[-1rem] flex items-center ">
        <StoreSwitcher items={stores} />
        <div className="hidden md:block ">
          <div className="ml-4 space-x-2 lg:space-x-5">
            <CategoriesNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
