import {Box, Button, CardActionArea, CardMedia, Grid, Link, Typography} from "@mui/material";
import NextLink from "next/link";
import {ItemCounter} from "../ui";
import {FC, useContext} from "react";
import { CartContext } from "../../context";
import { ICartProduct } from "../../interfaces";


interface Props {
  editable?:  boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

  const onNewCartQuantity = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity( product );

  }

  return (
    <>
    {
      cart.map( product => (
        <Grid container spacing={ 2 } key={ product.slug}>
          <Grid item xs={3}>
            <NextLink href={`/product/${ product.slug }`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={ `/products/${ product.image}`}
                    component='img'
                    sx={{ borderRadius: '5px'}}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>

          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{ product.title}</Typography>
              <Typography variant='body1'>Talla <strong>{ product.sizes }</strong></Typography>


              {
                editable
                ? (
                <ItemCounter 
                  currentValue={ product.quantity} 
                  maxValue={ 10 } 
                  updateQuantity={ ( value ) => onNewCartQuantity(product, value) } 
                  />)
                  : (
                    <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                  )
              }
            </Box>
          </Grid>

          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography>{ `$${product.price }`}</Typography>

            {
              editable && (
                <Button variant='text' color='secondary' onClick={() => removeCartProduct( product ) }>Remove </Button>
              )
            }
          </Grid>
        </Grid>
      )
       )
    }
    </>
  )
}