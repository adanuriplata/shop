import { ICartProduct } from "../../interfaces";
import { CartState } from "./CartProvider";

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
| { type: '[Cart] - Add Product', payload: ICartProduct[]}

export const cartReducer = ( state: CartState, action: CartActionType ) => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return { ...state }
    
    case '[Cart] - Add Product':
      return { 
        ...state,
        // cart: ...
      }
    default: return state;
  }
}