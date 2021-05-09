import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { login } from '../actions/userActions'

import TextField from '@material-ui/core/TextField'
import { addProduct } from '../actions/productActions'

const AddNewProductScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [vat, setVat] = useState('')
  const [netPrice, setNetPrice] = useState('')
  const handleSubmit = () => {
    dispatch(
      addProduct({
        name,
        vat,
        netPrice,
      })
    )
    history.push('/products')
  }

  return (
    <div>
      <Container  style={{width: '50%', marginLeft: 'auto', marginRight: 'auto', spacing: '10px'}}>
        <TextField className='mt-1' fullWidth label='Nazwa produktu' variant='outlined' value={name} onChange={(e) => setName(e.target.value)}/>
        <TextField className='mt-1' fullWidth label='VAT' variant='outlined' value={vat} onChange={(e) => setVat(e.target.value)}/>
        <TextField className='mt-1' fullWidth label='Cena netto' variant='outlined' value={netPrice} onChange={(e) => setNetPrice(e.target.value)}/>
        <Button className='mt-1' variant='outlined' color='primary' onClick={handleSubmit}> Zapisz dane firmy</Button>
      </Container>
      
    </div>
  )
}

export default AddNewProductScreen
