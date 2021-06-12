import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import {
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px',
  },
})

const ProductScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const classes = useStyles()

  const productDetails = (productId) => {
    //TODO disptach
    console.log(productId)
  }

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
      <Button
        variant='outlined'
        disableElevation
        color='primary'
        onClick={addNewProduct}
        className={classes.buttons}
        style={{ marginBottom: '20px' }}
      >
        Stwórz nowy produkt
      </Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Nazwa produktu</TableCell>
              <TableCell align='center'>Cena netto</TableCell>
              <TableCell align='center'>VAT</TableCell>
              <TableCell align='center'>Cena brutto</TableCell>
              <TableCell align='left'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{product.name}</TableCell>
                  <TableCell align='center'>
                    {parseFloat(product.price).toFixed(2)}
                  </TableCell>
                  <TableCell align='center'>{product.tax}%</TableCell>
                  <TableCell align='center'>
                    {parseFloat(
                      product.price + (product.price * product.tax) / 100
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell align='center'>
                    <div>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label='edit'
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductScreen
