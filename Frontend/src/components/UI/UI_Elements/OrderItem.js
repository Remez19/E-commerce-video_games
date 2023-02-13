import "./OrderItem.css";

function OrderItem({ orderData }) {
  const onInvoiceClickHandler = () => {
    window.open(orderData.invoiceUrl);
  };
  return (
    <div className="order-item__container">
      <div className="order-item__data-container">
        <div className="order-item__data-games">
          <p>Games</p>
          {orderData.items.map((itemInOrder) => {
            return (
              <div key={itemInOrder._id.toString()}>
                <img
                  src={itemInOrder.productData.imageUrl}
                  alt={itemInOrder.productData.title}
                />
                <p style={{ color: " #dfdfdf" }}>
                  {itemInOrder.productData.title}
                </p>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            height: "fit-content",
            alignItems: "center",
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
                {`$${itemInOrder.productData.price}`}
              </p>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            gap: "0.5rem",
            alignItems: "center",
            borderRight: "1px solid white",
            paddingRight: "0.5rem",
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
                key={itemInOrder._id.toString() + "2"}
                style={{ color: " #dfdfdf" }}
              >
                {`x${itemInOrder.quantity}`}
              </p>
            );
          })}
        </div>
        <div
          style={{
            marginRight: "0.5rem",
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            gap: "4rem",
            alignItems: "center",
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
            Total
          </p>
          <p style={{ color: " #dfdfdf" }}>{`$${Number(
            orderData.totalPrice
          ).toFixed(2)}`}</p>
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
  );
}

export default OrderItem;
