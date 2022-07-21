import {AppBar, Toolbar, Typography, Link, Button, IconButton, Badge} from "@mui/material";
import NextLink from 'next/link'
import {Box} from "@mui/system";
import {SearchOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import { useRouter } from 'next/router'
import { useContext } from "react";
import { UiContext } from "../../context";



export const Navbar = () => {

  const router = useRouter()

  const { toggleSidemenu } = useContext(UiContext)

  const isCurrentPage = (itemLink: string) => {
    const currentPage = router.pathname
    return currentPage === itemLink ? 'secondary' : 'primary'

  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.05 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={ 1 }></Box>

        <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
          <NextLink href='/category/men' passHref>
            <Link>
              <Button color={isCurrentPage('/category/men') }>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link>
              <Button color={isCurrentPage('/category/women')}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids' passHref>
            <Link>
              <Button color={isCurrentPage('/category/kids')}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={ 1 }></Box>

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={ 2 } color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSidemenu}>Menu</Button>

      </Toolbar>
    </AppBar>
  )
}