import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Stripe.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [paymentSecret, setPaymentSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardSuccess, setCardSuccess] = useState("");

  useEffect(() => {
    if (price && price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setPaymentSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setCardSuccess("");
      console.log("[error]", error);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(paymentSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    setProcessing(false);

    if (confirmError) {
      setCardError(confirmError.message);
      setCardSuccess("");
      console.log(confirmError);
    }

    if (paymentIntent.status === "succeeded") {
      setCardSuccess(paymentIntent.id);
      setCardError("");

      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
        status: "service pending",
        itemNames: cart.map((item) => item.name),
      };

      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.insertResult.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Payment successful!",
          });
          navigate("/order/salads", { replace: true });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {cardError && <p className="text-error">{cardError}</p>}
      {cardSuccess && (
        <p className="text-success">
          Transaction complete with transactionId: {cardSuccess}
        </p>
      )}
      <CardElement
        className="w-full"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-blue-600 text-white w-full"
        type="submit"
        disabled={!stripe || !paymentSecret || processing}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
