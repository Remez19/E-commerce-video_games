import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Cart.css";
import { useEffect, useState } from "react";
const Cart = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const user = useSelector((state) => state.ui.loggedInUser);
  const cart = user ? user.cart : undefined;

  useEffect(() => {
    if (cart) {
      let count = 0;
      for (const item of cart.items) {
        count += item.quantity;
      }
      setItemsCount(count);
    }
  }, [cart]);
  return (
    <NavLink to="/shop" className={`cart_btn ${!cart && "cart_btn--not"}`} end>
      {cart && <div className="cart-items__counter">{itemsCount}</div>}
    </NavLink>
  );
};
export default Cart;
