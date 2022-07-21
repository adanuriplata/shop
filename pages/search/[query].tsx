import type { NextPage, GetServerSideProps } from 'next'
import {Typography, Box} from "@mui/material";
import {ShopLayout} from "../../components/layouts";
import {ProductList} from "../../components/products";
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: boolean;
}


const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {

  // const { products, isLoading } = useProducts(`/products/${products}`)


  return (
    <ShopLayout pageDescription={'Encuentra los mejores productos'} title={'Teslo-Shop - Home'}>
      <Typography variant='h1' component={'h1'}>Buscar producto</Typography>
      {
        foundProducts
        ? 
        <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Término:  {query} </Typography>
        : (
          <Box display='flex'>
            <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto para el termino </Typography>
            <Typography variant='h2' sx={{ mb: 1 }} color="secondary" textTransform='capitalize' > {query} </Typography>
          </Box>
        )

      }

        <ProductList products={ products } />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if( query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }


  let products = await dbProducts.getProductsByTerm( query );
  const foundProducts = products.length > 0;

  if( !foundProducts ) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      query,
      foundProducts
    }
  }
}
 
export default SearchPage