import { useRef ,useContext} from 'react';
import CartModal from './CartModal.jsx';
import { ShoppingCartContext } from '../store/CartContext.jsx';
import CheckOut from './CheckOut.jsx';

export default function Header() {
  const ctnxCart=useContext(ShoppingCartContext);
  const cartModal = useRef();
  const checkModal=useRef();

  const cartQuantity = ctnxCart.items.length;

  function handleOpenCartClick() {
    cartModal.current.open();
  }

  function handleOpenCheckout(){
    checkModal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button onClick={handleOpenCheckout}>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={cartModal} title="Your Cart" actions={modalActions} />
      <CheckOut ref={checkModal} title ="CheckOut"/>
      <header id="main-header">
        <div id="main-title">
          <img src="logo2.png" alt="Food App" />
          <h1>Foodies</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
