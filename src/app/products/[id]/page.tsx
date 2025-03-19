"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useCartStore } from "../../../../store/cartStore";
import { CartItem } from "../../../../store/cartStore";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState<CartItem[]>([]);
  const [productData, setProductData] = useState<CartItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Expected an array from API, got:", res.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0 && id) {
      const product = products.find(
        (product) => product.id === parseInt(id as string)
      );
      setProductData(product || null);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (productData) {
      addToCart(productData);
    }
  };

  const handleBuyNow = () => {
    if (productData) {
      handleAddToCart();
      router.push("/cart");
    }
  };

  if (!productData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <Image
              src={productData.image}
              alt={productData.title}
              className="w-full h-auto object-cover mix-blend-multiply"
              width={1280}
              height={720}
              priority
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
            {productData.title}
          </h1>
          <p className="text-gray-600 mt-3">{productData.description}</p>
          <p className="text-3xl font-medium mt-6">
            ${productData.price.toFixed(2)}
          </p>
          <div className="flex items-center mt-10 gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              disabled={!productData}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              disabled={!productData}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
