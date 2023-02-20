import { useLoaderData } from "react-router-dom";
import { uiSliceActions } from "../../Store/ui";
import { useDispatch } from "react-redux";

import "./CheckoutSuccessPage.css";
import OrderItem from "../UI/UI_Elements/OrderItem";

function CheckoutSuccessPage() {
  const loaderData = useLoaderData();
  const { orderData, userCart } = loaderData;
  const dispatchAction = useDispatch();
  localStorage.setItem("cart", JSON.stringify(userCart));
  dispatchAction(uiSliceActions.updateUserCart(userCart));

  /**
   * Need to clear cart after order success.
   * Show the user the order and add + download link for the order invoice.
   * Need to send email with the order data.
   *
   *  */
  return (
    <main className="checkout-success-page__container">
      <h2>Thank you for your order!</h2>
      <p>Order Details</p>
      <OrderItem orderData={orderData} key={orderData._id.toString()} />
    </main>
  );
}

export default CheckoutSuccessPage;
