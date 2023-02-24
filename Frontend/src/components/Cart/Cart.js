import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

import "./Cart.css";
import { useEffect, useState } from "react";
const Cart = () => {
  const [itemsCount, setItemsCount] = useState(0);
  // const [playAnimation, setPlayAnimation] = useState(false);
  const user = useSelector((state) => state.ui.loggedInUser);
  let cart = undefined;
  if (user) {
    cart = user.cart;
  }

  useEffect(() => {
    if (cart) {
      let count = 0;
      for (const item of cart.items) {
        count += item.quantity;
      }
      if (count !== itemsCount) {
        setItemsCount(count);
        // setPlayAnimation(true);
      }
    }
  }, [cart, itemsCount]);
  return (
    <NavLink to={user ? "/shop" : "/login"} className="cart_btn" end>
      <FaShoppingCart size={"1rem"} color={"black"} />
      {cart && <div className="cart-items__counter">{itemsCount}</div>}
    </NavLink>
    // <NavLink to={user ? "/shop" : "/login"} className="cart_btn" end>
    //   {cart && <div className="cart-items__counter">{itemsCount}</div>}
    // </NavLink>
  );
};
export default Cart;
