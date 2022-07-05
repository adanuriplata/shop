import type { NextPage } from 'next'
import {ShopLayout} from "../components/layouts";
import {Typography} from "@mui/material";

const Home: NextPage = () => {
  return (
    <ShopLayout pageDescription={'Encuentra los mejores productos'} title={'Teslo-Shop - Home'}>
      <Typography variant='h1' component={'h1'}>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
    </ShopLayout>
  )
}

export default Home
