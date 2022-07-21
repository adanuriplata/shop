import ShopLayout from "../../components/layouts/ShopLayout";
import {Box, Button, Grid, Typography} from "@mui/material";
import {ProductSlideshow, SizeSelector} from "../../components/products";
import {ItemCounter} from "../../components/ui";
import { NextPage, GetServerSideProps, GetStaticProps, GetStaticPaths } from "next";
import { IProduct } from "../../interfaces";
import { db, dbProducts } from "../../database";


interface Props {
  product: IProduct
}



const  ProductPage:NextPage<Props> = ({ product }) => {
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
              <ItemCounter />
              <SizeSelector sizes={ product.sizes } selectedSize={ product.sizes[2] }  />
            </Box>

            <Button color='secondary'>
              Agregar al carrito
            </Button>

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