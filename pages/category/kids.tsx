import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const Kids: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid')
  return (
    <ShopLayout title={'Tesla-Shop - Kids'} pageDescription={'list kids'}>
      <Typography variant='h1' component={'h1'}>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Products Kids</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      
      }
    </ShopLayout>
  )
}

export default Kids