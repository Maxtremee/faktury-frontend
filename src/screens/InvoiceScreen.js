import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px'
  }
});

const InvoiceScreen = ({history}) => {
  const [invoices] = useState([
    {
      name: 'Faktura 1/3',
      netValue: 20000,
      vat: 23
    },
    {
      name: 'Faktura 1/2',
      netValue: 30000,
      vat: 23
    },
    {
      name: 'Faktura 2/2',
      netValue: 40000,
      vat: 23
    },
  ])

  const classes = useStyles();

  const addNewInvoice = () => {
    history.push('/invoices/add')
  }
  return (
    <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
      <Button variant='outlined' disableElevation color='primary' onClick={addNewInvoice} className={classes.buttons} style={{marginBottom: '20px'}}>Wystaw fakturę</Button> 
      
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Numer faktury</TableCell>
            <TableCell align="right">Wartość netto</TableCell>
            <TableCell align="right">Vat</TableCell>
            <TableCell align="right">Wartość brutto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {invoice.name}
              </TableCell>
              <TableCell align="right">{invoice.netValue}</TableCell>
              <TableCell align="right">{invoice.vat}</TableCell>
              <TableCell align="right">{invoice.netValue + (invoice.netValue*invoice.vat/100)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
  )
}

export default InvoiceScreen
