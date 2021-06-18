import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { Button } from '@material-ui/core'
import { logout } from '../actions/userActions'
import { withRouter } from "react-router-dom";

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



const MenuAppBar = ({ history }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };
  
  const menuItems = [
    {
      menuTitle: "Faktury",
      pageURL: "/invoices"
    },
    {
      menuTitle: "Produkty",
      pageURL: "/products"
    },
    {
      menuTitle: "Klienci",
      pageURL: "/contractors"
    },
    
  ];

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            Faktury
          </Typography>
          <div>
            {menuItems.map(( menuItem, index ) => (
              <Button
              key={index}
              variant='contained'
              disableElevation
              color='primary'
              onClick={() => handleButtonClick(menuItem.pageURL)}
              className={classes.menuItem}
            >
              {menuItem.menuTitle}
            </Button>
            ))}
          </div>
          <div className={classes.lastItem}>
            {auth ? (
              <>
                <Button
                  variant='contained'
                  disableElevation
                  color='primary'
                  onClick={() => handleButtonClick('/profile')}
                >
                  Profil
                </Button>
                <Button
                  variant='contained'
                  disableElevation
                  color='primary'
                  onClick={handleLogout}
                  href='/login'
                >
                  Wyloguj
                </Button>
              </>
            ) : (
              <Button
                variant='contained'
                disableElevation
                color='primary'
                onClick={() => handleButtonClick('/login')}
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

export default withRouter(MenuAppBar)