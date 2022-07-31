import { ICartProduct } from "../../interfaces";
import { CartState } from "./CartProvider";

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
| { type: '[Cart] - Updates products in cart', payload: ICartProduct[]}

export const cartReducer = ( state: CartState, action: CartActionType ) => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return { ...state }
    
    case '[Cart] - Updates products in cart':
      return { 
        ...state,
        cart: [...action.payload]

      }
    default: return state;
  }
}