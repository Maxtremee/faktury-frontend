import React, { useState, forwardRef, useEffect } from 'react'
import { ListGroup, Table, Form, Row, Col, Container } from 'react-bootstrap'
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  IconButton,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  OutlinedInput,
  InputLabel,
  Divider
} from '@material-ui/core'
import {BankFormat, FloatNumbers, NipFormat} from '../utils/numberFormat'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { Autocomplete } from '@material-ui/lab'
import dayjs from 'dayjs'
const user = {
  name: 'Firma Handlowa Michał Wróbel',
  nip: '0000000000',
  street: 'Głodna 420',
  postalCode: '23-413',
  city: 'Obsza',
  bankAccountNuber: '1234 1234 1234 1234 00',
  bankName: 'PEKAO',
}

const privateClients = [
  {
    name: 'Marcin',
    surname: 'Surmacz',
    street: 'Szybka 10',
    postalCode: '10-100',
    city: 'Warszawa',
  },
  {
    name: 'Jarek',
    surname: 'Granda',
    street: 'Długa 10',
    postalCode: '11-123',
    city: 'Gdańsk',
  },
]

const businessClients = [
  {
    businessName: 'FH SLUP',
    nip: '0013130013',
    street: 'Wybuchowa 13',
    postalCode: '31-133',
    city: 'Poznań',
  },
  {
    businessName: 'FH KANIBAL',
    nip: '33311223311',
    street: 'Smaczna 11',
    postalCode: '21-133',
    city: 'Madagaskar',
  },
]

const userData = {
  businessName: 'FH Sprzedawcy',
  nip: '0013130013',
  street: 'Ulica 13',
  postalCode: '21-313',
  city: 'Zamch',
  sellerAccount: '13231313123131',
  sellerBank: 'PKO BP',
}

const products = [
  {
    name: 'Porzeczka czarna',
    vat: 8,
    unit: 'kg',
    netPrice: 4,
  },
  {
    name: 'Porzeczka czerwona',
    vat: 23,
    unit: 'kg',
    netPrice: 1.5,
  },
]

const invoicesToday = 4

const AddInvoiceScreen = () => {
  const [invoiceNumber, setInvoiceNumber] = useState() // add default number based on current date
  const [issueDate, setIssueDate] = useState(dayjs().format('YYYY-MM-DD')) // add default today
  const [issuePlace, setIssuePlace] = useState(`${userData.city}`)
  const [transactionDate, setTransactionDate] = useState(
    dayjs().format('YYYY-MM-DD')
  ) // add default today
  // seller
  const [sellerName, setSellerName] = useState(userData.businessName)
  const [sellerNip, setSellerNip] = useState(userData.nip)
  const [sellerStreet, setSellerStreet] = useState(userData.street)
  const [sellerPostalCode, setSellerPostalCode] = useState(userData.postalCode)
  const [sellerCity, setSellerCity] = useState(userData.city)
  const [sellerAccount, setSellerAccount] = useState(userData.sellerAccount)
  const [sellerBank, setSellerBank] = useState(userData.sellerBank)

  //buyer
  //buyer BUSINESS
  const [buyerBusinessName, setBuyerBusinessName] = useState()
  const [buyerNip, setBuyerNip] = useState()

  //buyer PRIVATE
  const [buyerName, setBuyerName] = useState()
  const [buyerSurname, setBuyerSurname] = useState()

  const [buyerStreet, setBuyerStreet] = useState()
  const [buyerPostalCode, setBuyerPostalCode] = useState()
  const [buyerCity, setBuyerCity] = useState()
  const [buyerAccountNumber, setBuyerAccountNumber] = useState()
  const [buyerBankName, setBuyerBankName] = useState()
  const [buyerPhoneNumber, setBuyerPhoneNumber] = useState()
  const [buyerEmail, setBuyerEmail] = useState()


  const [invoiceEntriesCounter, setInvoiceEntriesCounter] = useState(0)
  const [invoiceEntries, setInvoiceEntries] = useState([])
  const [clientType, setClientType] = useState('business')
  const [name, setName] = useState()

  const [buyerMore, setBuyerMore] = useState(false)

  const buyerAutocompleteRef = React.createRef()

  const clearBuyerAutocomplete = () => {
    buyerAutocompleteRef.current
      .getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
      .click()
    // buyerAutocompleteRef.current.blur()
  }

  const addNewInvoiceEntry = () => {
    setInvoiceEntries([
      ...invoiceEntries,
      {
        id: invoiceEntries.length,
        // unit: 'szt.',
        // vat: 8,
      },
    ])
  }

  const changeInvoiceEntry = (newEntry) => {
    let arr = [
      ...invoiceEntries.map((invoice, idx) =>
        invoice.id == newEntry.id ? newEntry : invoice
      ),
    ]
    setInvoiceEntries(arr)
  }

  const showInvoice = () => {
    console.log(invoiceEntries)
  }

  const removeInvoiceEntry = (index) => {
    const arr = invoiceEntries.filter((invoice) => invoice.id == index)
    setInvoiceEntries(arr)
  }

  const dateChanged = (e) => {
    console.log(e)
  }

  const [selectedClient, setSelectedClient] = useState()

  const onClientTypeChange = (e) => {
    setClientType(e.target.value)
    setBuyerName('')
    setBuyerSurname('')
    setBuyerCity('')
    setBuyerPostalCode('')
    setBuyerStreet('')
    setBuyerBusinessName('')
    setBuyerNip('')
    clearBuyerAutocomplete()
  }

  const setCorpClientCompletion = (index) => {
    let details = businessClients[index]
    setBuyerNip(details.nip)
    setBuyerStreet(details.street)
    setBuyerPostalCode(details.postalCode)
    setBuyerCity(details.city)
  }

  const setPrivateClientCompletion = (index) => {
    let details = privateClients[index]
    setBuyerName(details.name)
    setBuyerSurname(details.surname)
    setBuyerStreet(details.street)
    setBuyerPostalCode(details.postalCode)
    setBuyerCity(details.city)
  }

  const dispatch = () => {
    console.log(
      `${invoiceNumber} ${issueDate} ${issuePlace} ${transactionDate}`
    )
    console.log(sellerName)
    console.log(sellerNip)
    console.log(`${sellerStreet} ${sellerPostalCode} ${sellerCity}`)
    console.log(sellerAccount)
    console.log(sellerBank)
    console.log(buyerName)
    console.log(buyerNip)
    console.log(`${buyerStreet} ${buyerPostalCode} ${buyerCity}`)
  }

  const generateInvoiceNumber = () => {
    let str1 = dayjs().format('MM/YY')
    console.log(str1)
    setInvoiceNumber(`${invoicesToday}/${str1}`)
  }
  const [buyerNameError, setBuyerNameError] = useState(false)
  const [buyerSurnameError, setBuyerSurnameError] = useState(false)
  const [buyerBusinessNameError, setBuyerBusinessError] = useState(false)
  const [buyerNipError, setBuyerNipError] = useState(false)

  const [buyerStreetError, setBuyerStreetError] = useState(false)
  const [buyerPostalCodeError, setBuyerPostalCodeError] = useState(false)
  const [buyerCityError, setBuyerCityError] = useState(false)

  const [sellerBusinessNameError, setSellerBusinessError] = useState(false)
  const [sellerNipError, setSellerNipError] = useState(false)

  const [sellerStreetError, setSellerStreetError] = useState(false)
  const [sellerPostalCodeError, setSellerPostalCodeError] = useState(false)
  const [sellerCityError, setSellerCityError] = useState(false)
  const [sellerAccountError, setSellerAccountError] = useState(false)
  const [sellerBankError, setSellerBankError] = useState(false)

  const validateData = () => {}

  return (
    <>
      <Form>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col>
                <FormControl margin='normal' size='small' variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Numer faktury
                  </InputLabel>
                  <OutlinedInput
                    value={invoiceNumber || ''}
                    onChanged={(e) => setInvoiceNumber(e.target.value)}
                    labelWidth={105}
                    endAdornment={
                      <InputAdornment position='end'>
                        <AddIcon onClick={generateInvoiceNumber} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Col>
              <Col>
                <TextField
                  label='Data wystawienia'
                  type='date'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Col>
              <Col>
                <TextField
                  label='Miejsce wystawienia'
                  margin='normal'
                  variant='outlined'
                  size='small'
                  value={issuePlace || ''}
                  onChange={(e) => setIssuePlace(e.target.value)}
                />
              </Col>
              <Col>
                <TextField
                  label='Data sprzedaży'
                  type='date'
                  variant='outlined'
                  margin='normal'
                  size='small'
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Container style={{ marginTop: '10px' }}>
              <Row style={{ marginBottom: '5px' }}>
                <Col md={5}>
                  <h4>Sprzedawca</h4>
                  <Table style={{ marginBottom: '0px' }}>
                    <th></th>
                  </Table>

                  <TextField
                    fullWidth
                    label='Nazwa firmy'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label='NIP'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={sellerNip}
                    onChange={(e) => setSellerNip(e.target.value)}
                    InputProps={{
                      inputComponent: NipFormat
                    }}
                  />

                  <TextField
                    fullWidth
                    label='Ulica i nr. domu'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={sellerStreet}
                    onChange={(e) => setSellerStreet(e.target.value)}
                  />
                  <Row>
                    <Col md={5}>
                      <TextField
                        label='Kod pocztowy'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={sellerPostalCode}
                        onChange={(e) => setSellerPostalCode(e.target.value)}
                      />
                    </Col>
                    <Col md={7}>
                      <TextField
                        fullWidth
                        label='Miasto'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={sellerCity}
                        onChange={(e) => setSellerCity(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={7}>
                      <TextField
                        fullWidth
                        label='Konto bankowe'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={sellerAccount}
                        onChange={(e) => setSellerAccount(e.target.value)}
                        InputProps={{
                          inputComponent: BankFormat
                        }}
                      />
                    </Col>
                    <Col md={5}>
                      <TextField
                        label='Nazwa banku'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={sellerBank}
                        onChange={(e) => setSellerBank(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <h4>Nabywca</h4>
                  <Table style={{ marginBottom: '0px' }}>
                    <th></th>
                  </Table>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Rodzaj klienta</FormLabel>
                    <RadioGroup
                      row
                      aria-label='Rodzaj klienta'
                      name='client-type'
                      value={clientType}
                      onChange={onClientTypeChange}
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
                  {clientType === 'business' ? (
                    <>
                      <Autocomplete
                        freeSolo
                        ref={buyerAutocompleteRef}
                        id='buyer-name'
                        options={businessClients.map(
                          (option) => option.businessName
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Nazwa Firmy'
                            margin='normal'
                            variant='outlined'
                            size='small'

                            //value={buyerBusinessName || ''}
                          />
                        )}
                        onInput={(e) => setBuyerBusinessName(e.target.value)}
                        onChange={(e, name) =>
                          e.target.className == 'MuiAutocomplete-option' &&
                          setCorpClientCompletion(e.target.dataset.optionIndex)
                        }
                      />

                      <TextField
                        fullWidth
                        label='NIP'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={buyerNip || ''}
                        onChange={(e) => setBuyerNip(e.target.value)}
                        InputProps={{
                          inputComponent: NipFormat
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Autocomplete
                        freeSolo
                        ref={buyerAutocompleteRef}
                        options={privateClients.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Imię'
                            margin='normal'
                            variant='outlined'
                            size='small'
                            inputValue={buyerName || ''}
                          />
                        )}
                        onInput={(e) => setBuyerName(e.target.value)}
                        onChange={(e, name) =>
                          e.target.className == 'MuiAutocomplete-option' &&
                          setPrivateClientCompletion(
                            e.target.dataset.optionIndex
                          )
                        }
                      />

                      <TextField
                        fullWidth
                        label='Nazwisko'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={buyerSurname || ''}
                        onChange={(e) => setBuyerSurname(e.target.value)}
                      />
                    </>
                  )}
                  <TextField
                    fullWidth
                    label='Ulica i nr.domu'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={buyerStreet || ''}
                    onChange={(e) => setBuyerStreet(e.target.value)}
                  />

                  <Row>
                    <Col md={5}>
                      <TextField
                        fullWidth
                        label='Kod pocztowy'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={buyerPostalCode || ''}
                        onChange={(e) => setBuyerPostalCode(e.target.value)}
                      />
                    </Col>
                    <Col md={7}>
                      <TextField
                        fullWidth
                        label='Miasto'
                        margin='normal'
                        variant='outlined'
                        size='small'
                        value={buyerCity || ''}
                        onChange={(e) => setBuyerCity(e.target.value)}
                      />
                    </Col>
                    {buyerMore && <Container>
                    <TextField
                      fullWidth
                      label='Numer telefonu'
                      margin='normal'
                      variant='outlined'
                      size='small'
                      value={buyerPhoneNumber || ''}
                      onChange={(e) => setBuyerPhoneNumber(e.target.value)}
                    />
                    
                    <TextField
                      fullWidth
                      label='Email'
                      type='email'
                      margin='normal'
                      variant='outlined'
                      size='small'
                      value={buyerEmail || ''}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label='Numer konta'
                      margin='normal'
                      variant='outlined'
                      size='small'
                      value={buyerAccountNumber || ''}
                      onChange={(e) => setBuyerAccountNumber(e.target.value)}
                      InputProps={{
                        inputComponent: BankFormat
                      }}
                    />
                    <TextField
                      fullWidth
                      label='Nazwa banku'
                      margin='normal'
                      variant='outlined'
                      size='small'
                      value={buyerBankName || ''}
                      onChange={(e) => setBuyerBankName(e.target.value)}
                    />
                    </Container>}
                    
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 5, offset: 7 }}>
                  <Button onClick={() => setBuyerMore(!buyerMore)}>
                    {!buyerMore ? 'Więcej' : 'Mniej'}
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Pozycje na fakturze</h3>
            <Divider />
            <Form.Group>
              {invoiceEntries &&
                invoiceEntries.map((invoice, index) => (
                  <InvoiceEntry
                    index={index}
                    data={invoice}
                    remove={removeInvoiceEntry}
                    change={changeInvoiceEntry}
                  />
                ))}
            </Form.Group>
          </ListGroup.Item>
        </ListGroup>
        <Button onClick={addNewInvoiceEntry}>Dodaj nową pozycję</Button>
        <Button onClick={() => dispatch()}>DEBUG</Button>
        <div></div>
      </Form>
    </>
  )
}





const InvoiceEntry = ({ index, data, change, remove }) => {
  const [name, setName] = useState(data.name)
  const [quantity, setQuantity] = useState(data.quantity)
  const [unit, setUnit] = useState(data.unit)
  const [netPrice, setNetPrice] = useState(data.netPrice)
  const [vat, setVat] = useState(data.vat)
  const [netValue, setNetValue] = useState(data.netValue)
  const [grossValue, setGrossValue] = useState(data.grossValue)
  const [id] = useState(index)

  const changeProductDetails = () => {
    let newEntry = {
      name,
      quantity,
      unit,
      netPrice,
      vat,
      netValue,
      grossValue,
      id,
    }
    change(newEntry)
  }

  const setProductCompletion = (index) => {
    const productData = products[index]
    setName(productData.name)
    setUnit(productData.unit)
    setVat(productData.vat)
    setNetPrice(productData.netPrice)
  }

  const calculateNewValues = () => {
    changeProductDetails()
    setNetValue(quantity * netPrice)
    setGrossValue(quantity * (netPrice + (netPrice * vat) / 100))
  }

  return (
    <Row style={{ marginBottom: '10px' }}>
      <Col md={3}>
        <Autocomplete
          freeSolo
          options={products.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Nazwa produktu'
              margin='normal'
              variant='outlined'
              size='small'
              value={name || ''}
            />
          )}
          onInput={(e) => setName(e.target.value)}
          onChange={(e, name) =>
            e.target.className == 'MuiAutocomplete-option' &&
            setProductCompletion(e.target.dataset.optionIndex)
          }
          onBlur={changeProductDetails}
        />
      </Col>
      <Col md={1}>
        <TextField
          fullWidth
          label='Ilość'
          margin='normal'
          variant='outlined'
          size='small'
          value={quantity || ''}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          onBlur={calculateNewValues}
        />
      </Col>
      <Col md={1}>
        <FormControl fullWidth variant='outlined' margin='normal' size='small'>
          <Select
            labelId='Jednostka'
            value={unit || ''}
            onChange={(e) => setUnit(e.target.value)}
            onBlur={changeProductDetails}
          >
            <MenuItem value={'szt.'}>szt.</MenuItem>
            <MenuItem value={'kg'}>kg</MenuItem>
          </Select>
        </FormControl>
      </Col>
      <Col md={1}>
        <TextField
          fullWidth
          label='Cena netto'
          margin='normal'
          type='text'
          variant='outlined'
          size='small'
          value={(netPrice && netPrice.toFixed(2)) || ''}
          InputProps={{
            endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
            inputComponent: FloatNumbers
          }}
          onChange={(e) => setNetPrice(parseFloat(e.target.value))}
          onBlur={calculateNewValues}
        />
      </Col>
      <Col md={1}>
        <FormControl fullWidth variant='outlined' margin='normal' size='small'>
          <Select
            labelId='VAT'
            value={vat || ''}
            onChange={(e) => setVat(e.target.value)}
            onBlur={calculateNewValues}
          >
            <MenuItem value={8}>8%</MenuItem>
            <MenuItem value={23}>23%</MenuItem>
          </Select>
        </FormControl>
      </Col>
      <Col md={2}>
        <TextField
          disabled
          fullWidth
          label='Wartość netto'
          margin='normal'
          variant='outlined'
          size='small'
          value={netValue && netValue.toFixed(2) || ''}
          InputProps={{
            endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
          }}
          onChanged={(e) => setNetValue(e.target.value)}
          onBlur={changeProductDetails}
        />
      </Col>
      <Col md={2}>
        <TextField
          disabled
          fullWidth
          label='Wartość brutto'
          margin='normal'
          variant='outlined'
          size='small'
          value={grossValue && grossValue.toFixed(2) || ''}
          InputProps={{
            endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
          }}
          onChanged={(e) => setGrossValue(e.target.value)}
          onBlur={changeProductDetails}
        />
      </Col>
      <Col md={1}>
        <FormControl margin='normal'>
          <IconButton
            aria-label='delete'
            color='primary'
            onClick={() => remove(id)}
          >
            <DeleteIcon />
          </IconButton>
        </FormControl>
      </Col>
    </Row>
  )
}

export default AddInvoiceScreen
