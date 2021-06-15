import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions/userActions'
const InvalidTokenScreen = ({ history }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  })
  const buttonHandler = () => {
    history.push('/login')
  }
  return (
    <div>
      <Grid
        container
        direction='column'
        xs={12}
        justify='center'
        alignItems='center'
      >
        <Grid item xs={6}>
          <h4>Twój token dostępu jest przedawniony.</h4>
        </Grid>
        <Grid item xs={6}>
          <h4>Prosimy o ponowne zalogowanie.</h4>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => buttonHandler()}>Zaloguj ponownie</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(InvalidTokenScreen)
