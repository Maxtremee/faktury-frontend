import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Fab,
  Tooltip,
  Button,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import GetAppIcon from '@material-ui/icons/GetApp'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import {
  getInvoices,
  getInvoicePdf,
  deleteInvoice,
} from '../actions/invoiceActions'
import dayjs from 'dayjs'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px',
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  },
})

const InvoiceScreen = ({ history }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { loading, error, invoices } = useSelector((state) => state.invoices)
  useEffect(() => {
    dispatch(getInvoices())
  }, [])

  const handleDelete = (index) => {
    const id = invoices[index].id
    dispatch(deleteInvoice(id))
  }
  const handleDownload = (index) => {
    dispatch(getInvoicePdf(invoices[index].id))
  }

  const handleEdit = (index) => {
    const id = invoices[index].id
    history.push(`/invoices/${id}`)
  }
  const classes = useStyles()

  const addNewInvoice = () => {
    history.push('/invoices/add')
  }
  const calculateInvoiceNetValue = (products) => {
    let netValueSum = 0
    products.map((product) => {
      netValueSum += product.price * product.quantity
    })
    return netValueSum
  }
  const calculateInvoiceGrossValue = (products) => {
    let grossValueSum = 0
    products.map((product) => {
      let netValue = product.price * product.quantity
      grossValueSum += netValue + (netValue * product.tax) / 100
    })
    return grossValueSum
  }
  return (
    <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fab}
        onClick={addNewInvoice}
      >
        <AddIcon />
        Wystaw fakturę
      </Fab>
      {loading ? (
        <div>
          Ładowanie... <CircularProgress />
        </div>
      ) : (
        <div>
          {invoices && invoices.length != 0 ? (
            <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Numer faktury</TableCell>
                      <TableCell align='center'>Klient</TableCell>
                      <TableCell align='center'>Data wystawienia</TableCell>
                      <TableCell align='center'>Wartość netto</TableCell>
                      <TableCell align='center'>Wartość brutto</TableCell>
                      <TableCell align='center'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices &&
                      invoices.map((invoice, index) => (
                        <TableRow key={index}>
                          <TableCell align='center'>{invoice.title}</TableCell>
                          <TableCell align='center'>{invoice.contractor.name}</TableCell>
                          <TableCell align='center'>
                            {dayjs(invoice.issueDate).format('DD-MM-YYYY')}
                          </TableCell>
                          <TableCell align='center'>
                            {calculateInvoiceNetValue(invoice.products).toFixed(2)} zł
                          </TableCell>
                          <TableCell align='center'>
                            {calculateInvoiceGrossValue(invoice.products).toFixed(2)} zł
                          </TableCell>
                          <TableCell align='center'>
                            <div>
                              <Tooltip title='Wyświetl fakturę'>
                                <IconButton
                                  aria-label='download'
                                  onClick={() => handleDownload(index)}
                                >
                                  <PictureAsPdfIcon />
                                </IconButton>
                              </Tooltip>
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
            <div>
              <h3>Brak faktur</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InvoiceScreen
