import { FC, useReducer, PropsWithChildren } from "react"
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./"

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: []
}

export const CartProvider:FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE )

  const addProductToCart = ( product: ICartProduct) => {
    // dispatch( {type: '[Cart] - Updates products in cart', payload: [product],} )

    //Solucion final
    const productInCart = state.cart.some( p => p._id === product._id);
    if ( !productInCart ) return dispatch({ type: '[Cart] - Updates products in cart', payload: [...state.cart, product]})

    const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.sizes === product.sizes );
    if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Updates products in cart', payload: [...state.cart, product]})

    const updateProducts = state.cart.map( p => {
      if( p._id !== product._id ) return p;
      if( p.size !== product.size ) return p;

      //actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: '[Cart] - Updates products in cart', payload: updateProducts})


  }

  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>     
  )
}