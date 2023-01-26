import "./CartPage.css";
import { useSelector } from "react-redux";
import CartItem from "../UI/UI_Elements/CartItem";

function CartPage() {
  const { cart } = useSelector((state) => state.ui.loggedInUser);
  return (
    <main className="cart-page__main-container">
      <h2>Your Cart</h2>
      {cart.items.length > 0 ? (
        cart.items.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem._id.toString()} />
        ))
      ) : (
        <h3>Cart is Empty</h3>
      )}
      {cart.items.length > 0 && (
        <button className="cart-page__order-now-btn">Order Now!</button>
      )}
    </main>
  );
}

export default CartPage;
