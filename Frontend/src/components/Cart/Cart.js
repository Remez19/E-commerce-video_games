import { NavLink } from "react-router-dom";

import "./Cart.css";
const Cart = ({ cart }) => {
  return (
    <NavLink to="/shop" className="cart_btn" end>
      {cart && <div className="cart-items__counter">{cart.items.length}</div>}
    </NavLink>
  );
};
export default Cart;
