import { Box, Divider, Drawer, IconButton, Input, InputAdornment, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react"
import { UiContext } from "../../context"
import { useRouter } from 'next/router'


export const SideMenu = () => {

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0 ) return;
    navigateTo(`/search/${ searchTerm }`);
   }

  const navigateTo = ( url: string ) => {
    toggleSidemenu();
    router.push(url)
  }

  const isCurrentPage = (itemLink: string) => {
    const currentPage = router.pathname
    return currentPage === itemLink ? 'secondary' : 'primary'

  }

  const { isMenuOpen, toggleSidemenu } = useContext(UiContext)
  return (
    <Drawer
      open={ isMenuOpen }
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSidemenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>

        <List>

          <ListItem>
            <Input
              autoFocus
              type='text'
              placeholder="Buscar..."
              value={ searchTerm }
              onChange={ (e) => setSearchTerm( e.target.value )}
              onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={ onSearchTerm }
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem >
            <ListItemIcon>
              <AccountCircleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItem>

          <ListItem >
            <ListItemIcon>
              <ConfirmationNumberOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Mis Ordenes'} />
          </ListItem>


          <ListItem
            button
            onClick={() => navigateTo('/category/men')}    
            sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <MaleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItem>

          <ListItem  
            button
            onClick={() => navigateTo('/category/women')}  
            sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <FemaleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigateTo('/category/kids')}  
            sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined/>
            </ListItemIcon>
              <Link>
                <ListItemText primary={'Niños'} />
              </Link>
          </ListItem>


          <ListItem >
            <ListItemIcon>
              <VpnKeyOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItem>

          <ListItem >
            <ListItemIcon>
              <LoginOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItem>


          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem >
            <ListItemIcon>
              <CategoryOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
          </ListItem>
          <ListItem >
            <ListItemIcon>
              <ConfirmationNumberOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Ordenes'} />
          </ListItem>

          <ListItem >
            <ListItemIcon>
              <AdminPanelSettings/>
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}