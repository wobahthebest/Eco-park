"use client";

import Image from "next/image";
import { useCartStore } from "../../../store/cartStore";
import Link from "next/link";
import { toast } from "sonner";
import { Trash } from "lucide-react";

const page = () => {
  const { likedItems, addToCart, removeFromLiked } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-foreground">
        ❤️ Liked Items
      </h2>

      {likedItems.length === 0 ? (
        <p className="text-center text-muted-foreground">No items liked yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {likedItems.map((item) => (
            <div
              key={item.id}
              className="relative border border-border p-4 rounded-lg bg-card shadow-sm hover:shadow-md transition"
            >
              <button
                className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition"
                onClick={() => removeFromLiked(item.id)}
              >
                <Trash className="w-5 h-5" />
              </button>

              <div className="relative w-full h-40 mb-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              <h3 className="text-lg font-semibold text-foreground truncate">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <p className="text-lg font-bold text-primary">${item.price}</p>

              <div className="flex justify-between mt-4">
                <Link href={`/products/${item.id}`}>
                  <button className="px-3 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-muted transition">
                    Full Sight
                  </button>
                </Link>

                <button
                  className="px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-ring transition"
                  onClick={() => {
                    addToCart(item);
                    toast.success("Added to cart! 🛒");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
