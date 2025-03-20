"use client";

import * as React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCartStore } from "../../store/cartStore";
import { toast } from "sonner";
import Link from "next/link";
import { CartItem } from "../../store/cartStore";
import { Heart } from "lucide-react";
import SwiperCore from "swiper";
import { $axios } from "../../http/api";
import { data } from "./constants/data";
const page = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [productsForCar, setProductsForCar] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const swiperRef = React.useRef<SwiperCore | null>(null);

  const { addToCart } = useCartStore();

  const { toggleLike } = useCartStore();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await $axios.get("/products");
  //       const res2 = await axios.get(
  //         "https://fakestoreapi.com/products?limit=5"
  //       );
  //       if (Array.isArray(res2.data)) {
  //         setProductsForCar(res2.data);
  //       }
  //       if (Array.isArray(res.data)) {
  //         setProducts(res.data);
  //       } else {
  //         console.log("Unexpected format", res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  //   setLoading(true);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await $axios.get("/products/");
        const res2 = await $axios.get("/products/");

        if (Array.isArray(res2.data)) {
          setProductsForCar(res2.data);
        }
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.log("Unexpected format", res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading && swiperRef.current) {
      swiperRef.current.update(); // Force Swiper to recalculate sizes and start
      swiperRef.current.autoplay.start(); // Explicitly start autoplay
    }
  }, []);

  if (!products || !loading)
    return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="w-full py-8 bg-gray-100">
          <div className="relative w-full max-w-7xl mx-auto">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="w-full h-[500px] rounded-xl shadow-xl overflow-hidden"
              onSwiper={(swiper) => {
                swiperRef.current = swiper; // Store Swiper instance in ref
              }}
            >
              {productsForCar.map((item) => (
                <SwiperSlide key={item.id} className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover brightness-75"
                    priority={true}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
                      {item.title}
                    </h2>
                    <p className="text-xl font-semibold drop-shadow-md">
                      ${item.price.toFixed(2)}
                    </p>
                    <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition duration-300 shadow-md">
                      Shop Now
                    </button>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev !left-4 !w-12 !h-12 bg-white/80 rounded-full text-black shadow-md hover:bg-white transition duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <div className="swiper-button-next !right-4 !w-12 !h-12 bg-white/80 rounded-full text-black shadow-md hover:bg-white transition duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Swiper>

            {/* Custom Pagination Styling */}
            <style jsx global>{`
              .swiper-pagination-bullet {
                background: white;
                opacity: 0.7;
                width: 10px;
                height: 10px;
                margin: 0 4px;
                transition: all 0.3s ease;
              }
              .swiper-pagination-bullet-active {
                opacity: 1;
                width: 12px;
                height: 12px;
                background: #ffffff;
              }
            `}</style>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl text-center hover:shadow-lg transition cursor-pointer bg-card border border-border flex flex-col items-center"
            >
              <div className="relative w-full h-44 mb-4">
                <Image
                  src={item.image1}
                  fill
                  alt={item.description_uz}
                  className="object-contain rounded-lg"
                />
              </div>

              <p className="font-semibold text-foreground truncate w-full">
                {item.title_uz}
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
                  onClick={() => {
                    toggleLike(item);
                    toast("added to the liked ");
                  }}
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
