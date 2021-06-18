import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import {
  Fab,
  Tooltip,
  CircularProgress,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getProducts, deleteProduct } from '../actions/productActions'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px',
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  },
})

const ProductScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
      return
    }
    else {
      dispatch(getProducts())
    }
  }, [userInfo])

  const classes = useStyles()

  const addNewProduct = () => {
    history.push('/products/add')
  }

  const handleDelete = (index) => {
    const id = products[index].id
    console.log(`deeting to delete ${id}`)
    dispatch(deleteProduct(id))
  }

  const handleEdit = (index) => {
    const id = products[index].id
    history.push(`/products/${id}`)
  }

  return (
    <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fab}
        onClick={addNewProduct}
      >
        <AddIcon />
        Dodaj produkt 
      </Fab>
      {loading ? (
        <div>
          <h4>Ładowanie...</h4> <CircularProgress />
        </div>
      ) : (
        <div>
          {products && products.length != 0 ? (
            <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Nazwa produktu</TableCell>
                      <TableCell align='center'>Cena netto</TableCell>
                      <TableCell align='center'>Jednostka</TableCell>
                      <TableCell align='center'>VAT</TableCell>
                      <TableCell align='center'>Cena brutto</TableCell>
                      <TableCell align='left'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell align='center'>{product.name}</TableCell>
                        <TableCell align='center'>
                          {parseFloat(product.price).toFixed(2)} zł 
                        </TableCell>
                        <TableCell align='center'>{product.unit}</TableCell>
                        <TableCell align='center'>{product.tax}%</TableCell>
                        <TableCell align='center'>
                          {parseFloat(
                            product.price + (product.price * product.tax) / 100
                          ).toFixed(2)} zł
                        </TableCell>
                        <TableCell align='center'>
                          <div>
                            <Tooltip title='Edytuj'>
                              <IconButton
                                aria-label='edit'
                                onClick={() => handleEdit(index)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Usuń'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => handleDelete(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div>
              <h3>Brak produktów</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductScreen
