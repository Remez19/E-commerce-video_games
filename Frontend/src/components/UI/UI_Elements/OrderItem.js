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
            <div className="order-item__data-games">
              <p>Games</p>
              {orderData.items.map((itemInOrder) => {
                return (
                  <div>
                    <img
                      src={itemInOrder.itemData.imageUrl}
                      alt={itemInOrder.itemData.title}
                    />
                    <p
                      key={itemInOrder._id.toString()}
                      style={{ color: " #dfdfdf" }}
                    >
                      {itemInOrder.itemData.title}
                    </p>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#e9e9e9",
                }}
              >
                Price
              </p>
              {orderData.items.map((itemInOrder) => {
                return (
                  <p
                    key={itemInOrder._id.toString() + "1"}
                    style={{ color: " #dfdfdf" }}
                  >
                    {`$${itemInOrder.itemData.price}`}
                  </p>
                );
              })}
            </div>
            <div
              style={{
                marginRight: "0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#e9e9e9",
                }}
              >
                Quantity
              </p>
              {orderData.items.map((itemInOrder) => {
                return (
                  <p
                    key={itemInOrder._id.toString() + "1"}
                    style={{ color: " #dfdfdf" }}
                  >
                    {`x${itemInOrder.quantity}`}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <p style={{ color: "#b1b1b1" }}>{`Date: ${new Date(
              orderData.created_at
            ).toLocaleDateString("en-us")}`}</p>
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
