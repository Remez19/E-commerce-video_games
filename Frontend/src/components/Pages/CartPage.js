import "./CartPage.css";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import CartItem from "../UI/UI_Elements/CartItem";
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
  const {
    error,
    isLoading,
    sendRequest: order,
  } = useHttp(
    {
      url: "http://localhost:8080/order",
      body: { userEmail: userEmail },
    },
    onOrderFinishHandler
  );

  const onClickOrderButtonHandler = () => {
    order();
  };
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  return (
    <>
      {isLoading ? (
        <Loading width={"100vw"} height={"100vh"} />
      ) : (
        <main className="cart-page__main-container">
          <h2>Your Cart</h2>
          {cart.items.length > 0 && (
            <h3>{`Total Price: $${cart.totalPrice}`}</h3>
          )}
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
