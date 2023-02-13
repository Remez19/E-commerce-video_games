import "./CartPage.css";
import CartItem from "../Cart/CartItem";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/UI_Utill/Loading";
import { uiSliceActions } from "../../Store/ui";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function CartPage() {
  const { cart, userEmail } = useSelector((state) => state.ui.loggedInUser);
  const dispatchAction = useDispatch();

  const onOrderFinishHandler = (resData) => {
    if (resData.url) {
      window.location.href = resData.url;
    } else if (resData.userCart) {
      localStorage.setItem("cart", JSON.stringify(resData.userCart));
      dispatchAction(uiSliceActions.updateUserCart(resData.userCart));
    }
  };
  const { error, isLoading, sendRequest } = useHttp(
    {
      body: { userEmail: userEmail },
    },
    onOrderFinishHandler
  );

  const onClickClearCartHandler = () => {
    sendRequest(undefined, "http://localhost:8080/cart/clearCart");
  };
  const onClickOrderButtonHandler = () => {
    sendRequest(undefined, "http://localhost:8080/order/payOrder");
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
            <h3>{`Total Price: $${Number(cart.totalPrice).toFixed(2)}`}</h3>
          )}
          {cart.items.length > 0 && (
            <button onClick={onClickClearCartHandler}>Clear Cart</button>
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
