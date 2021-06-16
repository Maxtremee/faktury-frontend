import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Paper,
  Button,
  InputAdornment,
  Grid,
  TextField,
  IconButton
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { login, registerAccount } from '../actions/userActions'

import {
  BankFormat,
  PhoneNumberFormat,
  PostalCodeFormat,
  NipFormat,
} from '../utils/numberFormat'

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [street, setStreet] = useState('')
  const [nip, setNip] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [bankName, setBankName] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const fillFieldsDebug = () => {
    setLogin('michal@email.com')
    setPassword('pass')
    setRepeatPassword('pass')
    setName('FH Frytka')
    setCity('Wrocław')
    setPostalCode('12311')
    setStreet('ul. Główna')
    setNip('1123133211')
    setPhoneNumber('111 222 333')
    setBankName('Bank Polski')
    setBankAccountNumber('1231231312313123123131323')
    setEmail('michal@email.com')
  }

  const registerAccountHandler = (event) => {
    event.preventDefault()
    console.log('register')
    dispatch(registerAccount({
      login,
      password,
      company: {
        name,
        address: {
          street,
          postalCode,
          city
        }
      },
      nip,
      phoneNumber,
      email,
      bankName,
      bankAccountNumber
    }))
    history.push('/login')
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <Grid container xs={12} justify='center'>
        <Grid container justify='center' xs={12}>
          <h2>Zarejestruj się</h2>
        </Grid>
        <Paper style={{ padding: '2%' }}>
          <Grid container spacing={5} direction='row' justify='center' xs={12}>
            <Grid item direction='column' xs={5}>
              <Grid container justify='center' xs={12}>
                <h4>Dane firmy</h4>
              </Grid>
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Nazwa firmy'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='NIP'
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                InputProps={{
                  inputComponent: NipFormat,
                }}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Numer konta bankowego'
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>PL</InputAdornment>
                  ),
                  inputComponent: BankFormat,
                }}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Nazwa banku'
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Ulica'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Kod pocztowy'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                InputProps={{
                  inputComponent: PostalCodeFormat,
                }}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Miasto'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Numer telefonu'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>+48</InputAdornment>
                  ),
                  inputComponent: PhoneNumberFormat,
                }}
              />
            </Grid>
            <Grid item direction='column' xs={5}>
              <Grid container justify='center' xs={12}>
                <h4>Dane logowania</h4>
              </Grid>
              <TextField
                fullWidth
                type='text'
                margin='normal'
                label='Login'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                margin='normal'
                label='Hasło'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                margin='normal'
                label='Powtórz hasło'
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
              <Grid xs={12} container justify='center' style={{ marginTop: '20%' }}>
                <Grid item xs={6} >
                  <Button onClick={registerAccountHandler} variant='outlined' color='primary' fullWidth>
                    Zarejestruj się
                  </Button>
                </Grid>
              </Grid>
              <Grid xs={12} container justify='center' style={{ marginTop: '20%' }}>
                <Grid item xs={6} >
                  <Button onClick={() => fillFieldsDebug()} variant='outlined' color='primary' fullWidth>
                    DEBUG
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default RegisterScreen 
