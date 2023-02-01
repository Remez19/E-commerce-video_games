import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { uiSliceActions } from "../../Store/ui";
import { useDispatch } from "react-redux";

import "./CheckoutSuccessPage.css";

function CheckoutSuccessPage() {
  const loaderData = useLoaderData();
  const { orderData, userCart } = loaderData;
  const dispatchAction = useDispatch();
  const onClickDownloadInvoiceHandler = () => {
    // Send request construct pdf file!
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(userCart));
    dispatchAction(uiSliceActions.updateUserCart(userCart));
  }, [dispatchAction, userCart]);
  /**
   * Need to clear cart after order success.
   * Show the user the order and add + download link for the order invoice.
   *
   *
   *  */
  return (
    <main className="checkout-success-page__container">
      <h2>Thank you for your order!</h2>
      <p>Order Details</p>
      <table className="checkout-success-page__table-order">
        <thead>
          <tr>
            <td>Item</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {orderData.items.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.itemData.title}</td>
                <td>{item.quantity}</td>
                <td>{`$${item.itemData.price}`}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Price: </td>
            <td></td>
            <td>{`$${orderData.totalPrice}`}</td>
          </tr>
        </tfoot>
      </table>
      <button onClick={onClickDownloadInvoiceHandler}>Download Invoice</button>
    </main>
  );
}

export default CheckoutSuccessPage;
