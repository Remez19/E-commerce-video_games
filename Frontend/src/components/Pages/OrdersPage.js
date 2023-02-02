import { useLoaderData } from "react-router-dom";

import "./OrdersPage.css";
import OrderItem from "../UI/UI_Elements/OrderItem";

function OrdersPage() {
  const loaderData = useLoaderData();
  const { userOrders } = loaderData;
  return (
    <main className="orders-page__conainer">
      <h2>Your orders</h2>
      {userOrders.length > 1 &&
        userOrders.map((order) => {
          return <OrderItem orderData={order} key={order._id.toString()} />;
        })}
      {userOrders.length === 1 && (
        <OrderItem
          orderData={userOrders[0]}
          key={userOrders[0]._id.toString()}
        />
      )}
    </main>
  );
}

export default OrdersPage;
