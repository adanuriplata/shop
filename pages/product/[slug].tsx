import ShopLayout from "../../components/layouts/ShopLayout";
import {Box, Button, Chip, Grid, Typography} from "@mui/material";
import {ProductSlideshow, SizeSelector} from "../../components/products";
import {ItemCounter} from "../../components/ui";
import { NextPage, GetServerSideProps, GetStaticProps, GetStaticPaths } from "next";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { db, dbProducts } from "../../database";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../../context";


interface Props {
  product: IProduct
}



const  ProductPage:NextPage<Props> = ({ product }) => {
  const {addProductToCart} = useContext(CartContext)
  const router = useRouter()

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    sizes: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct( currentProduct => ({...currentProduct, sizes:size}))
  }

  const updateQuantity = (newValue: number) => {
    setTempCartProduct( currentProduct => ({...currentProduct, quantity: newValue}))
  }

  const onAddProduct = () => {
    if( !tempCartProduct.sizes ) { return; }
    //TODO: llamar la accion del context para agregar al carrito
    // console.log({ tempCartProduct })
    addProductToCart(tempCartProduct)
    router.push('/cart');
  }

  return (
    <ShopLayout pageDescription={ product.title } title={ product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow
            images={ product.images }
          />
        </Grid>

        <Grid item xs={12} sm={ 5 }>
          <Box display='flex' flexDirection='column'>
            {/*titulos*/}

            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>

            <Box sx={{ my: 2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter currentValue={tempCartProduct.quantity} updateQuantity={updateQuantity} maxValue={product.inStock} />
              <SizeSelector 
                sizes={ product.sizes } 
                selectedSize={ product.sizes[2] }  
                onSelectedSize={(size) => selectedSize(size)}
              />
            </Box>

            {
              (product.inStock > 0)
              ? (
                <Button 
                color='secondary'
                onClick={ onAddProduct }
                >
            { 
              tempCartProduct.sizes
                ? 'Agregar al carrito'
                : 'seleccione una talla'
            }
              </Button>
              )
              :
              <Chip label='No hay disponibles' color="error" variant="outlined" />
            }



            {/*<Chip label='No hay disponibles' color='error' variant='outlined'></Chip>*/}

            <Box sx={{ mt:3}}>

              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.description}</Typography>

            </Box>
          </Box>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}



//* No usar SSR

// export const getServerSideProps: GetServerSideProps = async({ params }) => {
//   const {slug = ''} = params as { slug: string }
//   const product = await dbProducts.getProductBySlug( slug );

//   if ( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {product}, // will be passed to the page component as props
//   }
// } 




export default ProductPage


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs  = await dbProducts.getAllProductSlugs()  // your fetch function here 
  return {
    paths: productSlugs.map( ({slug}) => ( { 
      params: { 
        slug  
      } 
    })),    
    fallback: "blocking"
  }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}