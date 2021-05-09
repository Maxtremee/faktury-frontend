import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px'
  }
});

const ProductScreen = ({ history }) => {

  const classes = useStyles();

  const [products, setProducts] = useState([
    {
      name: 'Czapka',
      netPrice: 30,
      vat: 0.08,
      sold: 2
    },
    {
      name: 'Bluza',
      netPrice: 70,
      vat: 0.23,
      sold: 3,
    },
    {
      name: 'Sweter',
      netPrice: 50,
      vat: 0.08,
      sold: 0
    }
  ])

  const productDetails = (productId) => {
    //TODO disptach
    console.log(productId)
  }

  const addNewProduct = () => {
    history.push('/products/add')
  }

  return (
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
      <Button variant='outlined' disableElevation color='primary' onClick={addNewProduct} className={classes.buttons} style={{marginBottom: '20px'}}>Stwórz nowy produkt</Button> 
      
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwa produktu</TableCell>
            <TableCell align="right">Cena netto</TableCell>
            <TableCell align="right">VAT</TableCell>
            <TableCell align="right">Cena brutto</TableCell>
            <TableCell align="right">Sprzedano</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.netPrice}</TableCell>
              <TableCell align="right">{product.vat}</TableCell>
              <TableCell align="right">{product.netPrice + (product.netPrice*product.vat/100)}</TableCell>
              <TableCell align="right">{product.sold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ProductScreen
