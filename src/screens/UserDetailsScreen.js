import React, { useState, forwardRef, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import {
  TextField,
  FormControl,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import {BankFormat, NipFormat} from '../utils/numberFormat'
const UserDetailsScreen = () => {
  const [businessName, setBusinessName] = useState()
  const [nip, setNip] = useState()
  const [street, setStreet] = useState()
  const [postalCode, setPostalCode] = useState()
  const [city, setCity] = useState()
  const [bankAccount, setBankAccount] = useState()
  const [bankName, setBankName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()

  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    console.log('sumbit')
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h4>Dane Twojej firmy</h4>
          <TextField
            fullWidth
            label='Nazwa firmy'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <TextField
            fullWidth
            label='NIP'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            InputProps={{
              inputComponent: NipFormat
            }}
          />
          <TextField
            fullWidth
            label='Ulica'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <TextField
            fullWidth
            label='Kod pocztowy'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            fullWidth
            label='Miasto'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            fullWidth
            label='Numer konta bankowego'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            InputProps={{
              inputComponent: BankFormat
            }}
          />
          <TextField
            fullWidth
            label='Nazwa banku'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <TextField
            fullWidth
            label='Numer telefonu kontaktowego'
            type='text'
            variant='outlined'
            margin='normal'
            size='small'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label='Adres e-mail'
            type='email'
            variant='outlined'
            margin='normal'
            size='small'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
        <Col md={{ span: 4, offset: 1 }}>
          <h4>Zmień hasło</h4>
          <FormControl
            margin='normal'
            variant='outlined'
            style={{ width: '70%' }}
          >
            <InputLabel>Hasło</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            margin='normal'
            variant='outlined'
            style={{ width: '70%' }}
          >
            <InputLabel>Powtórz hasło</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={repeatPassword}
              variant='outlined'
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </FormControl>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col md={{ span: 2, offset: 5 }}>
          <Button
            fullWidth
            variant='outlined'
            color='primary'
            onClick={handleSubmit}
          >
            Potwierdź zmiany
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default UserDetailsScreen
