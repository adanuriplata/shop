import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const Women: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women')
  return (
    <ShopLayout title={'Tesla-Shop - Men'} pageDescription={'list women'}>
      <Typography variant='h1' component={'h1'}>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Products Women</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      
      }
    </ShopLayout>
  )
}

export default Women