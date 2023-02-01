import useHttp from "../../../hooks/use-http";
import { useState, useCallback, useEffect } from "react";

import "./OrderItem.css";
import Loading from "../UI_Utill/Loading";
function OrderItem({ orderData }) {
  const [reqConfig] = useState(
    {
      url: "http://localhost:8080/order/createOrderInvoice",
      body: { orderId: orderData._id.toString() },
    },
    []
  );
  const onInvoicePdfReady = useCallback(() => {}, []);
  const onInvoiceClickHandler = () => {
    downloadInvoice();
  };
  const {
    error,
    isLoading,
    sendRequest: downloadInvoice,
  } = useHttp(reqConfig, onInvoicePdfReady, false);
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="order-item__container">
          <div className="order-item__data-container">
            <div>
              <p style={{ fontWeight: "bold" }}>Games</p>
              {orderData.items.map((itemInOrder) => {
                return (
                  <p
                    key={itemInOrder._id.toString()}
                    style={{ color: "black" }}
                  >
                    {itemInOrder.itemData.title}
                  </p>
                );
              })}
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>Quantity</p>
              {orderData.items.map((itemInOrder) => {
                return (
                  <p
                    key={itemInOrder._id.toString() + "1"}
                    style={{ color: "black" }}
                  >
                    {`x${itemInOrder.quantity}`}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <p>{`Date: ${orderData.created_at}`}</p>
            <button title="Download Invoice" onClick={onInvoiceClickHandler}>
              Invoice
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderItem;
