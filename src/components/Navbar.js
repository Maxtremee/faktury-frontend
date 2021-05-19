import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link, Button, Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: '50px',
  },
  lastItem: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    underline: 'none',
  },
}))

export default function MenuAppBar({ history }) {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            Faktury
          </Typography>
          <div>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              href='/products'
              className={classes.menuItem}
            >
              Produkty
            </Button>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              href='/clients'
              className={classes.menuItem}
            >
              Klienci
            </Button>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              href='/invoices'
              className={classes.menuItem}
            >
              Faktury
            </Button>
          </div>
          <div className={classes.lastItem}>
            {auth ? (
              <>
                <Button
                  variant='contained'
                  disableElevation
                  color='primary'
                  href='/profile'
                >
                  Profil
                </Button>
                <Button
                  variant='contained'
                  disableElevation
                  color='primary'
                  href='/logout'
                >
                  Wyloguj
                </Button>
              </>
            ) : (
              <Button
                variant='contained'
                disableElevation
                color='primary'
                href='/login'
              >
                Zaloguj
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
