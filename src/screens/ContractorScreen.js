import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Fab,
  Tooltip,
  CircularProgress,
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
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { getContractors, deleteContractor } from '../actions/contractorActions'

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
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fab}
        onClick={handleAdd}
      >
        <AddIcon />
        Dodaj kontahenta 
      </Fab>
      {loading ? (
        <div>
          <h4>Ładowanie...</h4> <CircularProgress />
        </div>
      ) : (
        <div>
          {contractors && contractors.length != 0 ? (
            <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'> Nazwa </TableCell>
                      <TableCell align='center'>NIP</TableCell>
                      <TableCell align='center'>Adres</TableCell>
                      <TableCell align='center'>Kontakt</TableCell>
                      <TableCell align='center'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contractors.map((contractor, index) => (
                      <TableRow key={index}>
                        <TableCell align='center'>
                          {contractor.surname
                            ? `${contractor.name} ${contractor.surname}`
                            : `${contractor.name}`}
                        </TableCell>
                        <TableCell align='center'>{contractor.nip}</TableCell>
                        <TableCell align='center'>
                          <div>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                {contractor.address.street}
                              </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                {contractor.address.postalCode}{' '}
                                {contractor.address.city}
                              </Grid>
                            </Grid>
                          </div>
                        </TableCell>
                        <TableCell align='center'>
                          <div>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                Numer telefonu: {contractor.phoneNumber}
                              </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                Email: {contractor.email}
                              </Grid>
                            </Grid>
                          </div>
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
            <div>
              <h3>Brak kontrahentów</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ContractorScreen
