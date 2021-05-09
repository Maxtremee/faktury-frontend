import React, { useState } from 'react'
import {Dropdown, Container } from 'react-bootstrap'

import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px'
  }
});

const ClientScreen = ({ history }) => {

  const classes = useStyles();

  const [clients, setClients] = useState([
    {
      name: 'Bartek',
      surname: 'Bździuch',
      email: 'bartek@email.com',
      phone: '131313113'
    },
    {
      name: 'Marek',
      surname: 'Pokora',
      email: 'google@email.com',
      phone: '131313113'
    },
    {
      name: 'Tomek',
      surname: 'Wkładek',
      email: 'amazon@email.com',
      phone: '131313113'
    },
    {
      name: 'Firma Handlowa Bartek Bździuch',
      nip: '12345677889',
      email: 'bartek@email.com',
      phone: '131313113'
    },
    {
      name: 'Google',
      nip: '12345677889',
      email: 'google@email.com',
      phone: '131313113'
    },
    {
      name: 'Amazon',
      nip: '12345677889',
      email: 'amazon@email.com',
      phone: '131313113'
    },
  ])

  const addNewClient = () => {
    history.push('/clients/add')
  }

  return (
    <div style={{width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
      <Button
        variant='outlined'
        disableElevation
        color='primary'
        onClick={addNewClient}
        className={classes.buttons}
        style={{marginBottom: '20px'}}
      >
        Dodaj nowego klienta
      </Button>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell > Nazwa </TableCell>
              <TableCell align='left'>NIP</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>Nr. telefonu</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>
                  {client.surname? `${client.name} ${client.surname}` : `${client.name}`}
                </TableCell>
                <TableCell align='left'>{client.nip}</TableCell>
                <TableCell align='left'>{client.email}</TableCell>
                <TableCell align='left'>{client.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ClientScreen
