import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Container } from 'react-bootstrap'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { getContractors, deleteContractor } from '../actions/contractorActions'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: '20px',
  },
})

const ContractorScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { contractors, loading, error } = useSelector(
    (state) => state.contractors
  )
  useEffect(() => {
    dispatch(getContractors())
  }, [])
  const classes = useStyles()

  const handleAdd = () => {
    history.push('/contractors/add')
  }
  const handleEdit = (index) => {
    const id = contractors[index].id
    history.push(`/contractors/${id}`)
  }
  const handleDelete = (index) => {
    console.log(contractors[index])
    const id = contractors[index].id
    dispatch(deleteContractor(id))
  }
  return (
    <div style={{ width: '80%', marginRight: 'auto', marginLeft: 'auto' }}>
      <Button
        variant='outlined'
        disableElevation
        color='primary'
        onClick={handleAdd}
        className={classes.buttons}
        style={{ marginBottom: '20px' }}
      >
        Dodaj nowego kontrahenta
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'> Nazwa </TableCell>
              <TableCell align='center'>NIP</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Nr. telefonu</TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractors &&
              contractors.map((contractor, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {contractor.surname
                      ? `${contractor.name} ${contractor.surname}`
                      : `${contractor.name}`}
                  </TableCell>
                  <TableCell align='center'>{contractor.nip}</TableCell>
                  <TableCell align='center'>{contractor.email}</TableCell>
                  <TableCell align='center'>{contractor.phone}</TableCell>
                  <TableCell align='center'>
                    <div>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label='edit'
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ContractorScreen
