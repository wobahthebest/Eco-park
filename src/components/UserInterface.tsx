"use client";
import { Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { axiosInstance } from "@/lib/axiosInstance";
import { CartItem } from "../../store/cartStore";

const UserInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/?search=${searchTerm}`);
        setFilteredProducts(data);
      } catch (error) {
        console.log("error fetching products: ", error);
      }
      setLoading(false);
    };

    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between py-5 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <img
            className="h-14 w-14 rounded-full"
            src="/eco-store-logo.jpg"
            alt="Eco Store"
          />
          <Link
            href="/"
            className="text-4xl font-bold text-foreground font-mono tracking-wider transition hover:text-secondary"
          >
            EcoStore
          </Link>
        </div>

        <div className="relative w-full lg:w-[400px] flex items-center bg-muted px-4 py-3 rounded-md border border-border focus-within:ring-2 focus-within:ring-ring">
          <Search className="text-muted-foreground mr-2" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent focus:outline-none focus:ring-0 border-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/cart"
            className="text-foreground transition hover:text-secondary flex items-center space-x-2 md:px-6 py-2 rounded-xl px-2 bg-muted"
          >
            <p className="md:block hidden text-xl font-semibold">Cart</p>
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link
            href="/liked"
            className="text-foreground transition hover:text-secondary flex items-center space-x-2 md:px-6 py-2 rounded-xl px-2 bg-muted"
          >
            <p className="md:block hidden text-xl font-semibold">Liked</p>
            <Heart className="w-6 h-6" />
          </Link>
          <Link
            href="/profile"
            className="text-foreground transition hover:text-secondary flex items-center space-x-2 md:px-6 py-2 rounded-xl px-2 bg-muted"
          >
            <p className="md:block hidden text-xl font-semibold">Profile</p>
            <UserRound className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground mt-2">Searching...</p>
      )}

      {filteredProducts.length > 0 && (
        <div className="absolute w-full lg:w-[400px] bg-card border bg-primary border-border rounded-lg mt-2 p-2 shadow-lg max-h-60 overflow-y-auto z-50">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`}>
              <div
                key={product.id}
                className="flex border-b border-foreground items-center gap-3 p-3 hover:bg-muted transition cursor-pointer rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 object-contain rounded"
                />
                <p className="text-sm font-medium text-foreground">
                  {product.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInterface;
