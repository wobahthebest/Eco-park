"use client";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const UserInterface = () => {
  const [search, setSearch] = useState<string>(
    localStorage.getItem("value") || ""
  );

  const handleSerach = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between py-4 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <img
            className="h-14 w-14 rounded-full"
            src="https://media.istockphoto.com/id/1389111152/vector/shopping-cart-with-a-leaf-inside-circle-organic-shop-icon.jpg?s=612x612&w=0&k=20&c=TjNiLnPB7eUEni6mlvyTWd80LJdO8zig5DmKiHz8Lkk="
            alt="Eco Store"
          />
          <Link
            href="/"
            className="text-2xl font-bold text-secondary font-mono tracking-wider"
          >
            Eco Store
          </Link>
        </div>

        {/* <div className="w-full lg:w-auto flex items-center bg-muted px-4 py-3 rounded-md">
          <input
            type="text"
            className="flex-1 bg-transparent focus:outline-none text-black"
            value={search}
            onChange={(e) => handleSerach(e)}
            placeholder="Search..."
          />
          <Search />
        </div> */}

        <div className="flex items-center space-x-5">
          <Link href={"/cart"}>
            <ShoppingCart />
          </Link>
          <Link href={"/liked"}>
            <Heart />
          </Link>
          <Link href={"/profile"}>
            <UserRound />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInterface;
