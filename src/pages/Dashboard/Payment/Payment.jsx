import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const Payment = () => {
  const [cart] = useCart();

  const initialValue = 0;
  const total = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="w-full md:w-[80%] mx-auto my-8">
      <h3 className="text-3xl uppercase text-center">Payment</h3>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
