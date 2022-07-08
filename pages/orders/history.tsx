import {ShopLayout} from "../../components/layouts";
import {Chip, Link, Grid, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100},
  { field: 'fullname', headerName: 'Nombre Completo', width: 300},
  { field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined' />
          : <Chip color='error' label='No Pagada' variant='outlined' />
      )
    }
  },
  { field: 'Orden',
    headerName: 'Ver Orden',
    sortable: false,
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${ params.row.id }`}>
          <Link>
            Ver Orden
          </Link>
        </NextLink>
      )
    }
  },

]

const rows = [
  { id: 1, paid: true, fullname: 'Fernando H'},
  { id: 2, paid: true, fullname: 'Julian Casablancas'},
  { id: 3, paid: false, fullname: 'Elias Mauri'},
  { id: 4, paid: true, fullname: 'Sara Morales'},
  { id: 5, paid: false, fullname: 'Salvador Reyes'},
  { id: 6, paid: true, fullname: 'Alberto Garcia'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes de cliente'>
      <Typography variant='h1' component='h1'>Historial deordenes</Typography>

      <Grid container>
        <Grid item xs={ 12 } sx={{ height:650, width: '100%'}}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={ [10] }
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage