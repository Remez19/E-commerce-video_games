import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./OrderCheckoutPage.css";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/UI_Utill/Loading";

const Stripe_Key = process.env.REACT_APP_Stripe_Key;
const stripePromise = loadStripe(Stripe_Key);

function OrderCheckoutPage() {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState({
    clientSecret: "{{CLIENT_SECRET}}",
  });
  const [reqConfig] = useState({
    url: "http://localhost:8080/getClientKey",
    body: { userEmail: loggedInUser.userEmail },
  });

  const onFinishFetchClientSecretHandler = useCallback((resData) => {
    const { client_secret } = resData;
    setClientSecret({
      clientSecret: `${client_secret}`,
    });
  }, []);

  const {
    error,
    isLoading,
    sendRequest: fetchClientSecret,
  } = useHttp(reqConfig, onFinishFetchClientSecretHandler, true);

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("useId");
        localStorage.removeItem("cart");
        localStorage.removeItem("favorites");
        navigate("/login");
      } else {
        throw error;
      }
    }
    fetchClientSecret();
  }, [error, fetchClientSecret, navigate]);

  return (
    <>
      {isLoading ? (
        <Loading width={"100%"} height={"100%"} />
      ) : (
        <Elements stripe={stripePromise} options={clientSecret}>
          <form className="order-checkout-page__checkout-form">
            <PaymentElement></PaymentElement>
            <button type="submit">Order</button>
          </form>
        </Elements>
      )}
    </>
  );
}

export default OrderCheckoutPage;
/**
 * import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  )
};

export default CheckoutForm;
 */
