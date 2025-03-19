"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useCartStore } from "../../store/cartStore";
import { toast } from "sonner";
import Link from "next/link";
import { CartItem } from "../../store/cartStore";
import { Heart } from "lucide-react";
const page = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);

  const { addToCart } = useCartStore();

  const { toggleLike } = useCartStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products/");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setSelectedProduct(res.data[0]);
        } else {
          console.log("Unexpected format", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!products) return <div className="text-center mt-10">Loading...</div>;
  if (!selectedProduct)
    return <div className="text-center mt-10">Loading...</div>;
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {products.map((item) => (
            <CarouselItem
              key={item.id}
              onClick={() => setSelectedProduct(item)}
            >
              <div className="p-2 cursor-pointer">
                <Card className="bg-card hover:shadow-md transition rounded-lg border border-border">
                  <CardContent className="flex items-center justify-center p-6">
                    <AspectRatio
                      ratio={16 / 9}
                      className="flex items-center justify-center"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={250}
                        height={250}
                        className="object-contain"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter((item) => item.id !== selectedProduct?.id)
            .map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl text-center hover:shadow-lg transition cursor-pointer bg-card border border-border flex flex-col items-center"
              >
                <div className="relative w-full h-44 mb-4">
                  <Image
                    src={item.image}
                    fill
                    alt={item.description}
                    className="object-contain rounded-lg"
                  />
                </div>

                <p className="font-semibold text-foreground truncate w-full">
                  {item.title}
                </p>
                <p className="text-primary font-bold text-lg mt-1">
                  ${item.price}
                </p>

                <div className="flex justify-between gap-2 mt-4 w-full">
                  <Link href={`/products/${item.id}`} className="w-1/3">
                    <button className="w-full px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition">
                      Full Sight
                    </button>
                  </Link>

                  <button
                    onClick={() => toggleLike(item)}
                    className="p-2 rounded-lg transition hover:scale-110"
                  >
                    <Heart />
                  </button>

                  <button
                    className="w-1/3 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-ring transition"
                    onClick={() => {
                      addToCart(item);
                      toast("Successfully added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
