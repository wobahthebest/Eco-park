"use client";

import Image from "next/image";
import { useCartStore } from "../../../store/cartStore";
import Link from "next/link";
import { toast } from "sonner";

const LikedPage = () => {
  const { likedItems } = useCartStore();
  const { addToCart } = useCartStore();
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-center ">Liked Items</h2>
      {likedItems.length === 0 ? (
        <p>No items liked yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {likedItems.map((item) => (
            <div key={item.id} className="border px-3 py-2 rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain rounded-md"
                width={300}
                height={300}
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-500">${item.description}</p>
              <p className="text-gray-500 font-semibold">${item.price}</p>
              <Link href={`/products/${item.id}`}>
                <button className="px-2 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition">
                  Full Sight
                </button>
              </Link>
              <button
                className="px-2 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-ring transition"
                onClick={() => {
                  addToCart(item);
                  toast("Successfully added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPage;
