import { ShoppingCartContext } from "../store/CartContext";
import { useContext } from "react";
import * as motion from 'motion/react-client';
export default function Cart() {
  const cartCtnx = useContext(ShoppingCartContext);

  const totalPrice = cartCtnx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <div id="cart">
      {cartCtnx.items.length === 0 && <p>No items in cart!</p>}
      {cartCtnx.items.length > 0 && (
        <ul id="cart-items">
          {cartCtnx.items.map((item) => {
            const formattedPrice = item.price.toFixed(2);

            return (
              <li key={item.id}>
                <motion.div 
                initial={{scale:0,opacity:0}}
                animate={{scale:1,opacity:1}}
                >
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </motion.div>
                <div className="cart-item-actions">
                  <button onClick={() => cartCtnx.UpdateItemToCart(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => cartCtnx.UpdateItemToCart(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
