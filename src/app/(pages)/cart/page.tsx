"use client";
import { useCartStore } from "../../../../store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();
  const router = useRouter();

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast("Item removed from cart");
  };
  const handleCheckout = () => {
    clearCart();
    toast("Checkout successful!");
    router.push("/");
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shipping = 4;
  const total = subtotal + shipping;

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10 min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card shadow-lg p-6 rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-primary flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Continue Shopping
            </button>
          </div>
          <p className="text-muted-foreground mb-6">
            You have {cart.length} items in your cart
          </p>

          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg p-4 mb-4"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description.length >= 30
                        ? `${item.description.slice(0, 30)}...`
                        : item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="p-1"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="p-1"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <p className="text-lg font-medium">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-card shadow-lg p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/80 transition"
          >
            Checkout - ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
