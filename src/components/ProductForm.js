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

const ProductForm = (props) => {
  const [name, setName] = useState(props.name ? props.name : '')
  const [tax, setTax] = useState(props.tax ? props.tax : '')
  const [price, setPrice] = useState(props.price ? props.price : '')
  const [unit, setUnit] = useState(props.unit ? props.unit : 'szt.')
  const [buttonText, setButtonText] = useState(props.buttonText ? props.buttonText : 'Zapisz produkt')

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
          onClick={props.handleSubmit}
        >
          {buttonText}
        </Button>
      </Container>
    </div>
  )
}

export default ProductForm
