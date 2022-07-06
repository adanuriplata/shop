import {ShopLayout} from "../components/layouts";
import {Box, Typography} from "@mui/material";


const Custom404 = () => {
  return (
    <ShopLayout title='Pagina no encontrada' pageDescription='No hay nada que mostrar'>
      <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200} sx={{ flexDirection: { xs: 'column', sm: 'row' }}}>404 |</Typography>
        <Typography marginLeft={2} >No encontramos ninguna página aqui </Typography>
      </Box>
    </ShopLayout>
  )
}

export default Custom404