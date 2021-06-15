import React, { useState, forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Form, Row, Col, Container } from 'react-bootstrap'
import {
  Fab,
  Grid,
  makeStyles,
  Modal,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  Divider,
} from '@material-ui/core'
import {
  BankFormat,
  PhoneNumberFormat,
  PostalCodeFormat,
  FloatNumbers,
  NipFormat,
} from '../utils/numberFormat'
import { getContractors } from '../actions/contractorActions'
import { getProducts } from '../actions/productActions'
import { createInvoice, getInvoiceDetails } from '../actions/invoiceActions'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import { Autocomplete } from '@material-ui/lab'
import dayjs from 'dayjs'

const invoicesToday = 4
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabDown: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  },
  fabUp: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 120,
    left: 'auto',
    position: 'fixed',
  },
}))

const AddInvoiceScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, editedInvoice } = useSelector(
    (state) => state.invoices
  )
  const { company } = useSelector((state) => state.userLogin.userInfo)
  const { contractors } = useSelector((state) => state.contractors)
  const { products } = useSelector((state) => state.products)
  const classes = useStyles()

  useEffect(() => {
    dispatch(getContractors())
    dispatch(getProducts())
  }, [])
  
  const [edit, setEdit] = useState(false)
  const [buttonText, setButtonText] = useState('Zapisz produkt')
  //buyer
  const [buyerId, setBuyerId] = useState()
  const [buyerNip, setBuyerNip] = useState()
  const [buyerName, setBuyerName] = useState()
  const [buyerStreet, setBuyerStreet] = useState()
  const [buyerPostalCode, setBuyerPostalCode] = useState()
  const [buyerCity, setBuyerCity] = useState()
  const [buyerAccountNumber, setBuyerAccountNumber] = useState()
  const [buyerBankName, setBuyerBankName] = useState()
  const [buyerPhoneNumber, setBuyerPhoneNumber] = useState()
  const [buyerEmail, setBuyerEmail] = useState()
  
  const [invoiceNumber, setInvoiceNumber] = useState() // add default number based on current date
  const [issueDate, setIssueDate] = useState(dayjs().format('YYYY-MM-DD')) // add default today
  const [issuePlace, setIssuePlace] = useState(`${company.address.city}`)
  const [transactionDate, setTransactionDate] = useState(dayjs().format('YYYY-MM-DD'))
  // seller
  const [sellerName, setSellerName] = useState(company.name)
  const [sellerNip, setSellerNip] = useState(company.nip)
  const [sellerStreet, setSellerStreet] = useState(company.address.street)
  const [sellerPostalCode, setSellerPostalCode] = useState(company.address.postalCode)
  const [sellerCity, setSellerCity] = useState(company.address.city)
  const [sellerAccount, setSellerAccount] = useState(company.bankAccountNumber)
  const [sellerBank, setSellerBank] = useState(company.bankName)

  useEffect(() => {
    const [lastItem] = history.location.pathname.split('/').slice(-1)
    if (lastItem.length > 18) {
      setEdit(true)
      dispatch(getInvoiceDetails(lastItem))
    } else {
      setEdit(false)
      setButtonText('Zapisz produkt')
    }
  }, [])

  useEffect(() => {
    if (editedInvoice && editedInvoice.id) {
      console.log('edit')
      setBuyerName(editedInvoice.contractor.name)
      setBuyerNip(editedInvoice.contractor.id)
      setBuyerStreet(editedInvoice.contractor.address.street)
      setBuyerPostalCode(editedInvoice.contractor.address.postalCode)
      setBuyerCity(editedInvoice.contractor.address.city)
      setBuyerPhoneNumber(editedInvoice.contractor.phoneNumber)
      setBuyerEmail(editedInvoice.contractor.email)
      setBuyerBankName(editedInvoice.contractor.bankName) 
      setBuyerAccountNumber(editedInvoice.contractor.bankAccountNumber)
      setButtonText('Edytuj produkt')
    }
  }, [editedInvoice, dispatch])


  // ! new

  const [invoiceEntries, setInvoiceEntries] = useState([])
  const [clientType, setClientType] = useState('business')

  const [buyerMore, setBuyerMore] = useState(false)
  const [editUserData, setEditUserData] = useState(false)
  const [availableProducts, setAvailableProducts] = useState([])
  const [editBuyerData, setEditBuyerData] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const buyerAutocompleteRef = React.createRef()

  
  const handleModalOpen = () => {
    setEditBuyerData(false)
    setShowModal(true)
  }
  const handleModalClose = () => {
    setShowModal(false)
  }
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [unit, setUnit] = useState()
  const [tax, setTax] = useState()
  const [netPrice, setNetPrice] = useState()
  const [modalText, setModalText] = useState('Dodaj pozycje')
  const [quantity, setQuantity] = useState()
  const [netValue, setNetValue] = useState()
  const [grossValue, setGrossValue] = useState()

  const setProductCompletion = (index) => {
    const productData = products[index]
    setId(productData.id)
    setName(productData.name)
    setUnit(productData.unit)
    setTax(parseFloat(productData.tax))
    setNetPrice(productData.price)
  }
  const addInvoice = () => {
    let invoiceProducts = []
    invoiceEntries.map((invoiceEntry) => {
      invoiceProducts.push({
        id: invoiceEntry.id,
        name: invoiceEntry.name,
        price: invoiceEntry.netPrice,
        tax: invoiceEntry.tax,
        currency: 'PLN',
        unit: invoiceEntry.unit,
        quantity: invoiceEntry.quantity,
      })
    })
    let invoice = {
      created: new Date(),
      contractor: {
        id: buyerId,
        name: buyerName,
        address: {
          street: buyerStreet,
          postalCode: buyerPostalCode,
          city: buyerCity,
        },
        nip: buyerNip,
        phoneNumber: buyerPhoneNumber,
        email: buyerEmail,
        bankName: buyerBankName,
        bankAccountNumber: buyerAccountNumber,
      },
      title: invoiceNumber,
      products: invoiceProducts,
      issuePlace,
      issueDate,
      sellDate: transactionDate,
      paymentDate: transactionDate,
      paymentType: 'Płatność gotówką',
    }
    console.log(invoice)
    dispatch(createInvoice(invoice))
  }
  const showInvoice = () => {
    console.log(invoiceEntries)
  }

  const handleEdit = (index) => {
    console.log(index)
  }
  const handleDelete = (index) => {
    console.log(index)
  }
  const removeInvoiceEntry = (index) => {
    let arr = invoiceEntries.filter((entry) => entry.id !== index)
    setInvoiceEntries(arr)
  }

  const onClientTypeChange = (e) => {
    setClientType(e.target.value)
    setBuyerName('')
    setBuyerNip('')
    setBuyerStreet('')
    setBuyerPostalCode('')
    setBuyerCity('')
    setBuyerBankName('')
    setBuyerAccountNumber('')
    setBuyerPhoneNumber('')
    setBuyerEmail('')
  }

  const setClientCompletion = (index) => {
    let details = contractors[index]
    setBuyerId(details.id)
    setBuyerName(details.name)
    setBuyerNip(details.nip)
    setBuyerStreet(details.address.street)
    setBuyerPostalCode(details.address.postalCode)
    setBuyerCity(details.address.city)
    setBuyerBankName(details.bankName)
    setBuyerAccountNumber(details.bankAccountNumber)
    setBuyerPhoneNumber(details.phoneNumber)
    setBuyerEmail(details.email)
  }

  const generateInvoiceNumber = () => {
    let str1 = dayjs().format('MM/YY')
    console.log(str1)
    setInvoiceNumber(`${invoicesToday}/${str1}`)
  }

  const calculateNewValues = () => {
    setNetValue(quantity * netPrice)
    setGrossValue(quantity * (netPrice + (netPrice * tax) / 100))
  }
  const addProductToInvoice = () => {
    let newEntry = {
      id,
      name,
      quantity,
      netPrice,
      unit,
      tax,
      netValue,
      grossValue,
    }
    let newInvoiceEntries = [...invoiceEntries, newEntry]
    setInvoiceEntries(newInvoiceEntries)
    setId('')
    setName('')
    setQuantity('')
    setNetPrice('')
    setUnit('szt.')
    setTax('')
    setNetValue('')
    setGrossValue('')
    setShowModal(false)
  }
  return (
    <>
      <Fab
        variant='extended'
        size='medium'
        color='primary'
        className={classes.fabDown}
        onClick={addInvoice}
      >
        <NoteAddIcon />
        Wystaw fakturę
      </Fab>
      <Fab
        variant='extended'
        size='medium'
        color='secondary'
        className={classes.fabUp}
        onClick={handleModalOpen}
      >
        <AddIcon />
        Dodaj produkt
      </Fab>
      <Grid container alignItems='center' justify='center' spacing={8} xs={12}>
        <Grid item>
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
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <TextField
            label='Miejsce wystawienia'
            margin='normal'
            variant='outlined'
            size='small'
            value={issuePlace || ''}
            onChange={(e) => setIssuePlace(e.target.value)}
          />
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        justify='center'
        alignContent='space-around'
        spacing={6}
        style={{ marginBottom: '5px' }}
      >
        <Grid item direction='column' xs={4}>
          <h4>Sprzedawca</h4>
          <Table style={{ marginBottom: '0px' }}>
            <th></th>
          </Table>
          {editUserData ? (
            <div>
              <TextField
                disabled={!editUserData}
                fullWidth
                label='Nazwa firmy'
                margin='normal'
                variant='outlined'
                size='small'
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />
              <TextField
                disabled={!editUserData}
                fullWidth
                label='NIP'
                margin='normal'
                variant='outlined'
                size='small'
                value={sellerNip}
                onChange={(e) => setSellerNip(e.target.value)}
                InputProps={{
                  inputComponent: NipFormat,
                }}
              />

              <TextField
                disabled={!editUserData}
                fullWidth
                label='Ulica i nr. domu'
                margin='normal'
                variant='outlined'
                size='small'
                value={sellerStreet}
                onChange={(e) => setSellerStreet(e.target.value)}
              />
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <TextField
                    disabled={!editUserData}
                    label='Kod pocztowy'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={sellerPostalCode}
                    onChange={(e) => setSellerPostalCode(e.target.value)}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    disabled={!editUserData}
                    fullWidth
                    label='Miasto'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={sellerCity}
                    onChange={(e) => setSellerCity(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                disabled={!editUserData}
                fullWidth
                label='Konto bankowe'
                margin='normal'
                variant='outlined'
                size='small'
                value={sellerAccount}
                onChange={(e) => setSellerAccount(e.target.value)}
                InputProps={{
                  inputComponent: BankFormat,
                }}
              />
              <TextField
                disabled={!editUserData}
                fullWidth
                label='Nazwa banku'
                margin='normal'
                variant='outlined'
                size='small'
                value={sellerBank}
                onChange={(e) => setSellerBank(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <Grid
                direction='column'
                alignItems='center'
                justify='center'
                container
                xs={12}
              >
                <Grid container xs={12} style={{ marginTop: '2%' }}>
                  <Grid xs={5} item>
                    <h5>Nazwa</h5>
                  </Grid>
                  <Grid item xs={5}>
                    <h4>{company.name}</h4>
                  </Grid>
                </Grid>
                <Grid container xs={12} style={{ marginTop: '2%' }}>
                  <Grid xs={5} item>
                    <h5>Adres</h5>
                  </Grid>
                  <Grid item xs={5}>
                    <h5>
                      {company.address.street}
                      {company.address.street.length != 0 ? ',' : ''}{' '}
                      {company.address.postalCode} {company.address.city}
                    </h5>
                  </Grid>
                </Grid>
                <Grid container xs={12} style={{ marginTop: '2%' }}>
                  <Grid xs={5} item>
                    <h5>Numer telefonu</h5>
                  </Grid>
                  <Grid item xs={5}>
                    <h5>
                      {company.phoneNumber.length != 0 ? '+48' : ''}{' '}
                      {company.phoneNumber}
                    </h5>
                  </Grid>
                </Grid>
                <Grid container xs={12} style={{ marginTop: '2%' }}>
                  <Grid xs={5} item>
                    <h5>Adres email</h5>
                  </Grid>
                  <Grid item xs={5}>
                    <h5>{company.email}</h5>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
          <Button onClick={() => setEditUserData(!editUserData)}>
            Edytuj dane firmy
          </Button>
        </Grid>
        <Grid item direction='column' xs={4}>
          <h4>Nabywca</h4>
          <Table style={{ marginBottom: '0px' }}>
            <th></th>
          </Table>
          {editBuyerData ? (
            <div>
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
              <Autocomplete
                freeSolo
                ref={buyerAutocompleteRef}
                id='buyer-name'
                options={
                  contractors && contractors.map((option) => option.name)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      clientType === 'business'
                        ? 'Nazwa firmy'
                        : 'Nazwa klienta'
                    }
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={buyerName}
                  />
                )}
                onInput={(e) => setBuyerName(e.target.value)}
                onChange={(e, _) =>
                  e.target.className === 'MuiAutocomplete-option' &&
                  setClientCompletion(e.target.dataset.optionIndex)
                }
              />
              {clientType === 'business' && (
                <TextField
                  fullWidth
                  label='NIP'
                  margin='normal'
                  variant='outlined'
                  size='small'
                  value={buyerNip || ''}
                  onChange={(e) => setBuyerNip(e.target.value)}
                  InputProps={{
                    inputComponent: NipFormat,
                  }}
                />
              )}
              <TextField
                fullWidth
                label='Adres'
                margin='normal'
                variant='outlined'
                size='small'
                value={buyerStreet || ''}
                onChange={(e) => setBuyerStreet(e.target.value)}
              />

              <Grid container spacing={3} direction='row'>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Kod pocztowy'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={buyerPostalCode || ''}
                    onChange={(e) => setBuyerPostalCode(e.target.value)}
                    InputProps={{
                      inputComponent: PostalCodeFormat,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label='Miasto'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={buyerCity || ''}
                    onChange={(e) => setBuyerCity(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label='Numer konta'
                margin='normal'
                variant='outlined'
                size='small'
                value={buyerAccountNumber || ''}
                onChange={(e) => setBuyerAccountNumber(e.target.value)}
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
                margin='normal'
                variant='outlined'
                size='small'
                value={buyerBankName || ''}
                onChange={(e) => setBuyerBankName(e.target.value)}
              />
              {buyerMore && (
                <div>
                  <TextField
                    fullWidth
                    label='Numer telefonu'
                    margin='normal'
                    variant='outlined'
                    size='small'
                    value={buyerPhoneNumber || ''}
                    onChange={(e) => setBuyerPhoneNumber(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>+48</InputAdornment>
                      ),
                      inputComponent: PhoneNumberFormat,
                    }}
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
                </div>
              )}
              <Grid container direction='row'>
                <Grid item>
                  <Button onClick={() => setBuyerMore(!buyerMore)}>
                    {!buyerMore ? 'Więcej' : 'Mniej'}
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : (
            <Grid
              direction='column'
              alignItems='center'
              justify='center'
              container
              xs={12}
            >
              <Grid container xs={12} style={{ marginTop: '2%' }}>
                <Grid xs={5} item>
                  <h5>Nazwa</h5>
                </Grid>
                <Grid item xs={5}>
                  <h4>{buyerName}</h4>
                </Grid>
              </Grid>
              <Grid container xs={12} style={{ marginTop: '2%' }}>
                <Grid xs={5} item>
                  <h5>Adres</h5>
                </Grid>
                <Grid item xs={5}>
                  <h5>
                    {buyerStreet ? `${buyerStreet},` : ''} {buyerPostalCode}{' '}
                    {buyerCity}
                  </h5>
                </Grid>
              </Grid>
              <Grid container xs={12} style={{ marginTop: '2%' }}>
                <Grid xs={5} item>
                  <h5>Numer telefonu</h5>
                </Grid>
                <Grid item xs={5}>
                  <h5>
                    {buyerPhoneNumber ? '+48' : ''} {buyerPhoneNumber}
                  </h5>
                </Grid>
              </Grid>
              <Grid container xs={12} style={{ marginTop: '2%' }}>
                <Grid xs={5} item>
                  <h5>Adres email</h5>
                </Grid>
                <Grid item xs={5}>
                  <h5>{buyerEmail}</h5>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid container justify='center' style={{ marginTop: '5%' }}>
            <Button
              variant='outlined'
              onClick={() => setEditBuyerData(!editBuyerData)}
            >
              {editBuyerData ? 'Zawierdź dane klienta' : 'Edytuj dane klienta'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={4} alignItems='center' justify='center'>
        <Grid item xs={8}>
          {invoiceEntries.length !== 0 ? (
            <div>
              <Grid container justify='center' xs={12}>
                <h3>Faktura</h3>
              </Grid>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Nazwa produktu</TableCell>
                      <TableCell align='center'>Cena netto</TableCell>
                      <TableCell align='center'>Ilość</TableCell>
                      <TableCell align='center'>VAT</TableCell>
                      <TableCell align='center'>Wartość netto</TableCell>
                      <TableCell align='center'>Wartość brutto</TableCell>
                      <TableCell align='left'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceEntries &&
                      invoiceEntries.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell align='center'>{entry.name}</TableCell>
                          <TableCell align='center'>
                            {entry.netPrice} zł
                          </TableCell>
                          <TableCell align='center'>
                            <Grid>
                              {entry.quantity} {entry.unit}
                            </Grid>
                          </TableCell>
                          <TableCell align='center'>{entry.tax} %</TableCell>
                          <TableCell align='center'>
                            {entry.netValue} zł
                          </TableCell>
                          <TableCell align='center'>
                            {entry.grossValue} zł
                          </TableCell>
                          <TableCell align='center'>
                            <div>
                              <Tooltip title='Edytuj'>
                                <IconButton
                                  aria-label='edit'
                                  onClick={() => handleEdit(index)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Usuń'>
                                <IconButton
                                  aria-label='delete'
                                  onClick={() => handleDelete(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <Grid container justify='center' xs={12}>
              <h3>Brak pozycji w fakturze</h3>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Modal
        open={showModal}
        onClose={handleModalClose}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <Grid container alignItems='center' justify='center' xs={12}>
            <Grid item>
              <h3>{modalText}</h3>
            </Grid>
            <Grid item direction='column' xs={12}>
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
                    // value={name || ''}
                  />
                )}
                // onInput={(e) => setName(e.target.value)}
                onChange={(e, _) =>
                  e.target.className === 'MuiAutocomplete-option' &&
                  setProductCompletion(e.target.dataset.optionIndex)
                }
                // onBlur={changeProductDetails}
              />
            </Grid>
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
            <FormControl
              fullWidth
              variant='outlined'
              margin='normal'
              size='small'
            >
              <Select
                labelId='Jednostka'
                value={unit || ''}
                onChange={(e) => setUnit(e.target.value)}
                // onBlur={changeProductDetails}
              >
                <MenuItem value={'szt.'}>szt.</MenuItem>
                <MenuItem value={'kg'}>kg</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label='Cena netto'
              margin='normal'
              type='text'
              variant='outlined'
              size='small'
              value={netPrice && netPrice}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>zł</InputAdornment>
                ),
                inputComponent: FloatNumbers,
              }}
              onChange={(e) => setNetPrice(parseFloat(e.target.value))}
              onBlur={calculateNewValues}
            />
            <FormControl
              fullWidth
              variant='outlined'
              margin='normal'
              size='small'
            >
              <Select
                labelId='VAT'
                value={tax || ''}
                onChange={(e) => setTax(e.target.value)}
                onBlur={calculateNewValues}
              >
                <MenuItem value={8}>8%</MenuItem>
                <MenuItem value={23}>23%</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled
              fullWidth
              label='Wartość netto'
              margin='normal'
              variant='outlined'
              size='small'
              value={(netValue && netValue.toFixed(2)) || ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>zł</InputAdornment>
                ),
              }}
              onChanged={(e) => setNetValue(e.target.value)}
              // onBlur={changeProductDetails}
            />
            <TextField
              disabled
              fullWidth
              label='Wartość brutto'
              margin='normal'
              variant='outlined'
              size='small'
              value={(grossValue && grossValue.toFixed(2)) || ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>zł</InputAdornment>
                ),
              }}
              onChanged={(e) => setGrossValue(e.target.value)}
              // onBlur={changeProductDetails}
            />
            <Button onClick={addProductToInvoice}>Dodaj produkt</Button>
          </Grid>
        </div>
      </Modal>
    </>
  )
}

export default AddInvoiceScreen
