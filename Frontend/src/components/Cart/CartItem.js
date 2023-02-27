import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiSliceActions } from "../../Store/ui";
import { GiPriceTag } from "react-icons/gi";

import "./CartItem.css";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/UI_Utill/Loading";

function CartItem({ cartItem }) {
  const dispatchAction = useDispatch();
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  // itemId, userId, price
  const { productData } = cartItem;

  const onCartActionFinishHandler = (resData) => {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(resData.newCart));
    dispatchAction(uiSliceActions.updateUserCart(resData.newCart));
  };

  const { error, sendRequest, isLoading } = useHttp(
    {},
    onCartActionFinishHandler
  );

  const onClickRemoveItemHandler = () => {
    const url = "http://localhost:8080/cart/removeFromCart";
    sendRequest(
      {
        itemId: productData._id,
        price: productData.price,
        userEmail: loggedInUser.userEmail,
      },
      url
    );
  };

  const onClickChangeQuantityHandler = (e) => {
    // e.target.innerText
    const url = "http://localhost:8080/cart/changeCartItemQuantity";
    sendRequest(
      {
        itemId: productData._id,
        price: productData.price,
        userEmail: loggedInUser.userEmail,
        operation: e.target.innerText,
      },
      url
    );
  };

  useEffect(() => {
    if (error) {
      // in case of an error
      throw error;
    }
  }, [error]);
  return (
    <>
      {isLoading ? (
        <Loading width={"100%"} height={"100%"} />
      ) : (
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#85bb65",
                fontSize: "0.8rem",
              }}
            >
              <GiPriceTag color="#85bb65" size={"1rem"} />
              {`${productData.price}$`}
            </div>
            <div className="cart-item__platforms-container">
              Platforms:
              <ul className="cart-item__platforms-list">
                {productData.platforms.includes("PS") && (
                  <li
                    style={{
                      backgroundImage: `url(${require("../../images/Platforms/ps.png")})`,
                    }}
                  ></li>
                )}
                {productData.platforms.includes("XBOX") && (
                  <li
                    style={{
                      backgroundImage: `url(${require("../../images/Platforms/xbox.png")})`,
                    }}
                  ></li>
                )}
                {productData.platforms.includes("PC") && (
                  <li
                    style={{
                      backgroundImage: `url(${require("../../images/Platforms/pc.png")})`,
                    }}
                  ></li>
                )}
              </ul>
            </div>
            <div className="cart-item__quantity">
              {`Quantity: ${cartItem.quantity}`}
              <button onClick={onClickChangeQuantityHandler}>-</button>
              {cartItem.quantity}
              <button onClick={onClickChangeQuantityHandler}>+</button>
            </div>
            <button onClick={onClickRemoveItemHandler}>Remove</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartItem;
