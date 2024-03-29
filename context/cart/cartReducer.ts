import { ICartProduct } from "../../interfaces";
import { CartState } from "./CartProvider";

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
| { type: '[Cart] - Updates products in cart', payload: ICartProduct[]}
| { type: '[Cart] - Change cart quantity', payload: ICartProduct}
| { type: '[Cart] - Remove product in cart', payload: ICartProduct}
| { 
  type: '[Cart] - Update order summary', 
  payload: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  }}

export const cartReducer = ( state: CartState, action: CartActionType ) => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return { 
        ...state,
        cart: [...action.payload]

      }
    
    case '[Cart] - Updates products in cart':
      return { 
        ...state,
        cart: [...action.payload]

      }

    case '[Cart] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map( product => {
          if ( product._id !== action.payload._id ) return product;
          if ( product.sizes !== action.payload.sizes ) return product;

          return action.payload;
        })
      }

      case '[Cart] - Remove product in cart':
        return {
          ...state,
          cart: state.cart.filter( product => !(product._id === action.payload._id && product.sizes === action.payload.sizes) )
        }

      case '[Cart] - Update order summary':
        return {
          ...state,
          ...action.payload
        }

    default: return state;
  }
}