import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal } from 'react-bootstrap'
import { Snackbar, Button, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import Visibility from '@material-ui/icons/Visibility'
import Email from '@material-ui/icons/Email'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginScreen = ({ history, location }) => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('email@email.com')
  const [password, setPassword] = useState('password123')
  const [showInfoModal, setShowInfoModal] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    if (userInfo && redirect) {
      history.push(redirect)
    } else if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      login({
        email,
        password,
      })
    )
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [showSnackbar, setShowSnackbar] = useState(false)
  const handleCloseSnackbar = () => {
    setShowSnackbar(false)
  }

  const handleOpenSnackbar = () => {
    setShowSnackbar(true)
  }
  useEffect(() => {
    if(error) {
      handleOpenSnackbar()
    }
  }, [error])

  return (
    <Container
      className='d-flex flex-column justify-content-center align-items-center'
      style={{ marginTop: '10%' }}
    >
      <h2>Zaloguj się</h2>

      <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='error'>
          Błąd logowania.
        </Alert>
      </Snackbar>

      <FormControl margin='normal' variant='outlined' style={{width: '25%'}}>
        <InputLabel>Email</InputLabel>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          endAdornment={
            <InputAdornment position='end' >
              <IconButton disabled>
                <Email/>
                </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl margin='normal' variant='outlined' style={{width: '25%'}}>
        <InputLabel>Hasło</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
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
      </FormControl>

      <Button variant='outlined' color='primary' style={{ marginTop: '2%' }} onClick={submitHandler}>
        Zaloguj się
      </Button>
      <Button style={{ marginTop: '2%' }} color='secondary' href='/register'>
        Nie masz konta? Zarejestruj się
      </Button>
    </Container>
  )
}

export default LoginScreen
