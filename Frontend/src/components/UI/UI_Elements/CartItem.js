import { useState } from "react";

import "./CartItem.css";
import useHttp from "../../../hooks/use-http";

function CartItem({ cartItem }) {
  // localhost8080://cart/
  const [reqConfig, setReqConfig] = useState({
    url: "http://localhost:8080/",
  });
  const { productData } = cartItem;
  return (
    <div className="cart-item__container">
      <div className="cart-item__image-container">
        <img
          className="cart-item__image"
          src={productData.imageUrl}
          alt={productData.title}
        ></img>
      </div>
      <div className="cart-item__info-continer">
        <p className="cart-item__title">{productData.title}</p>
        <p className="cart-item__price">{`Price: $${productData.price}`}</p>
        <div className="cart-item__platforms-container">
          Platforms:
          <ul className="cart-item__platforms-list">
            {productData.platforms.includes("PS") && (
              <li
                style={{
                  backgroundImage: `url(${require("../../../images/Platforms/ps.png")})`,
                }}
              ></li>
            )}
            {productData.platforms.includes("XBOX") && (
              <li
                style={{
                  backgroundImage: `url(${require("../../../images/Platforms/xbox.png")})`,
                }}
              ></li>
            )}
            {productData.platforms.includes("PC") && (
              <li
                style={{
                  backgroundImage: `url(${require("../../../images/Platforms/pc.png")})`,
                }}
              ></li>
            )}
          </ul>
        </div>
        <div className="cart-item__quantity">
          {`Quantity: ${cartItem.quantity}`}
          <button>-</button>
          {cartItem.quantity}
          <button>+</button>
        </div>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
