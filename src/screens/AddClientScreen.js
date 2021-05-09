import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Button,
  TextField,
  Container,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core'
const AddNewClientScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [nip, setNip] = useState('')

  const [street, setStreet] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const [clientType, setClientType] = useState('business')

  const handleSubmit = () => {
    // dispatch(addClient({
    //   name,
    //   surname,
    //   businessName,
    //   nip,
    //   street,
    //   postalCode,
    //   city,
    //   phoneNumber,
    //   email
    // }))
    // history.push('/clients')
  }
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
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Rodzaj klienta</FormLabel>
          <RadioGroup
            row
            aria-label='Rodzaj klienta'
            name='client-type'
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
          >
            <FormControlLabel
              value='business'
              control={<Radio />}
              label='Firma'
            />
            <FormControlLabel
              value='private'
              control={<Radio />}
              label='Prywanie'
            />
          </RadioGroup>
        </FormControl>
        {clientType === 'private' ? (
          <div>
            <TextField
              className='mt-1'
              fullWidth
              label='Imię'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className='mt-1'
              fullWidth
              label='Nazwisko'
              variant='outlined'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <TextField
              className='mt-1'
              fullWidth
              label='Nazwa firmy'
              variant='outlined'
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <TextField
              className='mt-1'
              fullWidth
              label='VAT'
              variant='outlined'
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
        )}

        <TextField
          className='mt-1'
          fullWidth
          label='Ulica i nr.domu'
          variant='outlined'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          className='mt-1'
          fullWidth
          label='Kod pocztowy'
          variant='outlined'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          className='mt-1'
          fullWidth
          label='Miasto'
          variant='outlined'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          className='mt-1'
          fullWidth
          label='Numer telefonu'
          variant='outlined'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          className='mt-1'
          fullWidth
          label='Adres email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className='mt-1'
          variant='outlined'
          color='primary'
          onClick={handleSubmit}
        >
          {' '}
          Dodaj klienta
        </Button>
      </Container>
    </div>
  )
}

export default AddNewClientScreen
