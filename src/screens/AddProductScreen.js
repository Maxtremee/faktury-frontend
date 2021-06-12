import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
} from '@material-ui/core'
import { login } from '../actions/userActions'
import TextField from '@material-ui/core/TextField'
import {
  addProduct,
  getProductDetails,
  editProduct,
} from '../actions/productActions'
const AddNewProductScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, editedProduct } = useSelector(
    (state) => state.products
  )
  const [name, setName] = useState('')
  const [tax, setTax] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('szt.')
  const [buttonText, setButtonText] = useState('Zapisz produkt')
  const [edit, setEdit] = useState(false)
  const handleSubmit = () => {
    if (edit) {
      dispatch(
        editProduct({
          id: editedProduct.id,
          name,
          tax: parseInt(tax),
          price: parseFloat(price),
          currency: 'PLN',
          unit,
        })
      )
      setEdit(false)
      setButtonText('Zapisz produkt')
    } else {
      dispatch(
        addProduct({
          name,
          tax: parseInt(tax),
          price: parseFloat(price),
          unit,
        })
      )
    }
    history.push('/products')
  }
  useEffect(() => {
    const [lastItem] = history.location.pathname.split('/').slice(-1)
    console.log(lastItem)
    if (lastItem.length > 18) {
      setEdit(true)
      dispatch(getProductDetails(lastItem))
    } else {
      setEdit(false)
      setButtonText('Zapisz produkt')
    }
  }, [])
  useEffect(() => {
    if (editedProduct && editedProduct.name) {
      console.log('edit')
      setName(editedProduct.name)
      setTax(editedProduct.tax)
      setPrice(editedProduct.price)
      setUnit(editedProduct.unit)
      setButtonText('Edytuj produkt')
    }
  }, [editedProduct, dispatch])
  return (
    <div>
      <Container
        style={{
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          spacing: '10px',
        }}
      >
        <TextField
          margin='normal'
          fullWidth
          label='Nazwa produktu'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin='normal'
          fullWidth
          label='VAT'
          variant='outlined'
          value={tax}
          onChange={(e) => setTax(e.target.value)}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Cena netto'
          variant='outlined'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormControl fullWidth variant='outlined' margin='normal'>
          <FormLabel variant='outlined'>Jednostka miary</FormLabel>
          <Select
            labelId='Jednostka miary'
            value={unit || ''}
            onChange={(e) => setUnit(e.target.value)}
          >
            <MenuItem value={'szt.'}>szt.</MenuItem>
            <MenuItem value={'kg.'}>kg.</MenuItem>
          </Select>
        </FormControl>
        <Button
          className='mt-1'
          variant='outlined'
          color='primary'
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </Container>
    </div>
  )
}

export default AddNewProductScreen
