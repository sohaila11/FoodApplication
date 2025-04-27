import { ShoppingCartContext } from "../store/CartContext";
import { useContext } from "react";
export default function Product({
  id,
  image,
  title,
  price,
  }) 
{
  const ctnxcart=useContext(ShoppingCartContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>{price}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => ctnxcart.addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
