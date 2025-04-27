import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { act } from "react";

export const ShoppingCartContext = createContext({
  items: [],
  addItemToCart: () => {},
  UpdateItemToCart: () => {},
});

function shoppingReducer(state, action) {
  if (action.type == "Add_Item") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type == "Update_Item") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingstate, shoppingdispatch] = useReducer(shoppingReducer, {
    items: [],
  });

  function handleAddItemToCart(id) {
    shoppingdispatch({
      type: "Add_Item",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingdispatch({
      type: "Update_Item",
      payload: {
        productId,
        amount,
      },
    });
  }

  const cntxV = {
    items: shoppingstate.items,
    addItemToCart: handleAddItemToCart,
    UpdateItemToCart: handleUpdateCartItemQuantity,
  };
  return (
    <ShoppingCartContext.Provider value={cntxV}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
