import React, { useState, forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Snackbar,
  Grid,
  CircularProgress,
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
import { BankFormat, PhoneNumberFormat, NipFormat } from '../utils/numberFormat'
import { updateProfile, updatePassword } from '../actions/userActions'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserDetailsScreen = ({history}) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
      return
    }
    else {
      setName(userInfo.company.name)
      setNip(userInfo.company.nip)
      setStreet(userInfo.company.address.street)
      setPostalCode(userInfo.company.address.postalCode)
      setCity(userInfo.company.address.city)
      setBankAccountNumber(userInfo.company.bankAccountNumber)
      setBankName(userInfo.company.bankName)
      setPhoneNumber(userInfo.company.phoneNumber)
      setEmail(userInfo.company.email)
    }
  }, [userInfo])

  const [name, setName] = useState()
  const [nip, setNip] = useState()
  const [street, setStreet] = useState()
  const [postalCode, setPostalCode] = useState()
  const [city, setCity] = useState()
  const [bankAccountNumber, setBankAccountNumber] = useState()
  const [bankName, setBankName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()

  const [password, setPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [repeatNewPassword, setRepeatNewPassword] = useState()

  const [showPassword, setShowPassword] = useState(false)


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const updateProfileHandler = (event) => {
    event.preventDefault()
    console.log('updateProfile')
    setMessage('Profil uaktualniony')
    dispatch(
      updateProfile({
        name,
        nip,
        address: {
          street,
          postalCode,
          city,
        },
        bankAccountNumber,
        bankName,
        phoneNumber,
        email,
        phoneNumber,
      })
    )
    handleOpenSnackbar()
  }
  const updatePasswordHandler = (event) => {
    event.preventDefault()
    console.log('updatePassword')
    setMessage('Hasło zmienione')
    dispatch(
      updatePassword({
        old_password: password,
        new_password: newPassword,
      })
    )
    setPassword('')
    setNewPassword('')
    setRepeatNewPassword('')
  }

  const [showSnackbar, setShowSnackbar] = useState(false)
  const [message, setMessage] = useState('')

  const handleCloseSnackbar = () => {
    setShowSnackbar(false)
  }

  const handleOpenSnackbar = () => {
    setShowSnackbar(true)
  }
  // useEffect(() => {
  //   if(error) {
  //     setMessage('Błąd')      
  //     handleOpenSnackbar()
  //   }
  //   else {
  //     setMessage('Zmiana przebiegła pomyślnie')
  //     handleOpenSnackbar()
  //   }
  // }, [dispatch, error])

  return (
    <div>
      {/* <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {message} 
        </Alert>
      </Snackbar> */}

        <div>
          <Grid container spacing={5} direction='row'>
            <Grid item xs={6} direction='column'>
              <h4>Dane Twojej firmy</h4>
              <TextField
                fullWidth
                label='Nazwa firmy'
                type='text'
                variant='outlined'
                margin='normal'
                size='small'
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  inputComponent: NipFormat,
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>+48</InputAdornment>
                  ),
                  inputComponent: PhoneNumberFormat,
                }}
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
              <Grid
                container
                xs={12}
                alignItems='center'
                justify='center'
                style={{ marginTop: '2%' }}
              >
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={updateProfileHandler}
                  >
                    Edytuj dane firmy
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
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
                <InputLabel>Nowe hasło</InputLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  variant='outlined'
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>

              <FormControl
                margin='normal'
                variant='outlined'
                style={{ width: '70%' }}
              >
                <InputLabel>Powtórz nowe hasło</InputLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={repeatNewPassword}
                  variant='outlined'
                  onChange={(e) => setRepeatNewPassword(e.target.value)}
                />
              </FormControl>

              <Grid
                container
                xs={12}
                alignItems='center'
                justify='center'
                style={{ marginTop: '2%' }}
              >
                <Grid item xs={5}>
                  <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={updatePasswordHandler}
                  >
                    Zmień hasło
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
    </div>
  )
}

export default UserDetailsScreen
