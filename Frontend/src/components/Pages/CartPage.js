import "./CartPage.css";
import { useSelector } from "react-redux";

import CartItem from "../Cart/CartItem";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import Loading from "../UI/UI_Utill/Loading";

function CartPage() {
  const { cart, userEmail } = useSelector((state) => state.ui.loggedInUser);

  const onOrderFinishHandler = (resData) => {
    if (resData.url) {
      window.location.href = resData.url;
    }
  };
  const { error, isLoading, sendRequest } = useHttp(
    {
      body: { userEmail: userEmail },
    },
    onOrderFinishHandler
  );

  const onClickOrderButtonHandler = () => {
    sendRequest({ url: "http://localhost:8080/order/payOrder" });
  };
  useEffect(() => {
    if (error) {
      if (error.statusCode === 401) throw error;
    }
  }, [error]);
  return (
    <>
      {isLoading ? (
        <Loading width={"100%"} height={"100%"} />
      ) : (
        <main className="cart-page__main-container">
          <h2>Your Cart</h2>
          {cart.items.length > 0 && (
            <h3>{`Total Price: $${cart.totalPrice}`}</h3>
          )}
          {/* <button>Clear Cart</button> */}
          {cart.items.length > 0 ? (
            cart.items.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem._id.toString()} />
            ))
          ) : (
            <h3>Cart is Empty</h3>
          )}
          {cart.items.length > 0 && (
            <button onClick={onClickOrderButtonHandler}>Order Now!</button>
          )}
        </main>
      )}
    </>
  );
}

export default CartPage;
