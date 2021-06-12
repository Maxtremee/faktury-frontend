import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContractor, editContractor, getContractorDetails } from '../actions/contractorActions'
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
const AddContractorScreen = ({ history }) => {
  const dispatch = useDispatch()
  const {loading, error, editedContractor } = useSelector(state => state.contractors)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [businessName, setBusinessName] = useState('')
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

  const debug = () => {
    setStreet('Cegelniana 13')
    setBusinessName('FH Wrobel')
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
      setSurname(editedContractor.surname)
      setEmail(editedContractor.email)
      setPhoneNumber(editedContractor.phoneNumber)
      setAccountNumber(editedContractor.accountNumber)
      setBankName(editedContractor.bankName)
      setStreet(editedContractor.street)
      setBusinessName(editedContractor.businessName)
      setNip(editedContractor.nip)
      setCity(editedContractor.city)
      setPostalCode(editedContractor.postalCode)

      setButtonText('Edytuj kontrahenta')
    }
  }, [editedContractor, dispatch])
  const handleSubmit = () => {
    if(edit) {
      dispatch(editContractor({
        // name,
        // surname,
        id: editedContractor.id,
        name: businessName,
        nip,
        firstAddressLine: `${street}, ${postalCode} ${city}`,
        secondAddressLine: ``,
        info: `${phoneNumber !== '' ? 'tel. ' + phoneNumber : ''}, ${
          email !== '' ? 'email: ' + email : ''
        }`,
        bankName: ``,
        bankAccountNumber: ``,
      }))
    } else {
      dispatch(
        addContractor({
          // name,
          // surname,
          name: businessName,
          nip,
          firstAddressLine: `${street}, ${postalCode} ${city}`,
          secondAddressLine: ``,
          info: `${phoneNumber !== '' ? 'tel. ' + phoneNumber : ''}, ${
            email !== '' ? 'email: ' + email : ''
          }`,
          bankName: ``,
          bankAccountNumber: ``,
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
        {clientType === 'private' ? (
          <div>
            <TextField
              fullWidth
              label='Imię'
              variant='outlined'
              margin='normal'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label='Nazwisko'
              variant='outlined'
              margin='normal'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <TextField
              fullWidth
              label='Nazwa firmy'
              variant='outlined'
              margin='normal'
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <TextField
              margin='normal'
              fullWidth
              label='NIP'
              variant='outlined'
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
        )}

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
        />
        <TextField
          margin='normal'
          fullWidth
          label='Miasto'
          variant='outlined'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
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
        <Button
          margin='normal'
          variant='outlined'
          color='primary'
          onClick={handleSubmit}
        >
          Dodaj klienta
        </Button>
        <Button variant='outlined' onClick={debug}>
          FILL DEBUG
        </Button>
      </Container>
    </div>
  )
}

export default AddContractorScreen
