import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BankFormat, PostalCodeFormat, NipFormat } from '../utils/numberFormat'
import {
  addContractor,
  editContractor,
  getContractorDetails,
} from '../actions/contractorActions'
import {
  InputAdornment,
  Grid,
  Button,
  TextField,
  Container,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core'
const AddContractorScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, editedContractor } = useSelector(
    (state) => state.contractors
  )
  const [name, setName] = useState('')
  const [nip, setNip] = useState('')

  const [street, setStreet] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [clientType, setClientType] = useState('business')
  const [edit, setEdit] = useState(false)
  const [buttonText, setButtonText] = useState('Dodaj kontrahenta')

  const [additionalInfo, setAdditionalInfo] = useState(false)

  const debug = () => {
    setStreet('Cegelniana 13')
    setName('FH Wrobel')
    setNip('1231313312')
    setCity('Krakow')
    setPostalCode('23-131')
    setEmail('test@test.com')
    setPhoneNumber('123 133 123')
    setAccountNumber('PL12 3123 1231 3133 1233 1231 1231')
    setBankName('Pekao')
  }

  useEffect(() => {
    const [lastItem] = history.location.pathname.split('/').slice(-1)
    console.log(lastItem)
    if (lastItem.length > 18) {
      setEdit(true)
      dispatch(getContractorDetails(lastItem))
    } else {
      setEdit(false)
      setButtonText('Zapisz kontrahenta')
    }
  }, [])

  useEffect(() => {
    if (editedContractor && editedContractor.name) {
      console.log('edit')
      setName(editedContractor.name)
      setNip(editedContractor.nip)
      setAccountNumber(editedContractor.bankAccountNumber)
      setBankName(editedContractor.bankName)
      setStreet(editedContractor.address.street)
      setCity(editedContractor.address.city)
      setPostalCode(editedContractor.address.postalCode)
      setPhoneNumber(editedContractor.phoneNumber)
      setEmail(editedContractor.email)

      setButtonText('Edytuj kontrahenta')
    }
  }, [editedContractor, dispatch])
  const handleSubmit = () => {
    if (edit) {
      dispatch(
        editContractor({
          id: editedContractor.id,
          name,
          nip,
          address: {
            street,
            postalCode,
            city,
          },
          phoneNumber,
          email,
          bankName,
          bankAccountNumber: accountNumber.startsWith('PL')
            ? accountNumber
            : `PL${accountNumber}`,
        })
      )
      setEdit(false)
      setButtonText('Zapisz produkt')
    } else {
      dispatch(
        addContractor({
          name,
          nip,
          address: {
            street,
            postalCode,
            city,
          },
          phoneNumber,
          email,
          bankName,
          bankAccountNumber: accountNumber.startsWith('PL')
            ? accountNumber
            : `PL${accountNumber}`,
        })
      )
    }
    history.push('/contractors')
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
        <FormControl component='fieldset' margin='normal'>
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
        <TextField
          fullWidth
          label={clientType === 'business' ? 'Nazwa firmy' : 'Imię'}
          variant='outlined'
          margin='normal'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {clientType === 'business' && (
        <TextField
          margin='normal'
          fullWidth
          label='NIP'
          variant='outlined'
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          InputProps={{
            inputComponent: NipFormat,
          }}
        />
        )}

        <TextField
          margin='normal'
          fullWidth
          label='Numer konta bankowego'
          variant='outlined'
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position='start'>PL</InputAdornment>,
            inputComponent: BankFormat,
          }}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Nazwa banku'
          variant='outlined'
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Ulica i nr.domu'
          variant='outlined'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Kod pocztowy'
          variant='outlined'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          InputProps={{
            inputComponent: PostalCodeFormat,
          }}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Miasto'
          variant='outlined'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {additionalInfo && (
          <div>
            <TextField
              margin='normal'
              fullWidth
              label='Numer telefonu'
              variant='outlined'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              margin='normal'
              fullWidth
              label='Adres email'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        <div>
          <Grid container>
            <Button onClick={() => setAdditionalInfo(!additionalInfo)}>
              Dodatkowe informacje
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs={12} spacing={1}>
              <Button
                margin='normal'
                variant='outlined'
                color='primary'
                onClick={handleSubmit}
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Button variant='outlined' onClick={debug}>
              FILL DEBUG
            </Button>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default AddContractorScreen
