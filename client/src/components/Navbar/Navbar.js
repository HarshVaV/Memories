import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { LOGOUT } from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    // track change in 'userStatus' (regularly) with useState
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //via useEffect, change update 'userState' if use logged-in
    //can use re-directed path: useLocation
    //can use localStorage
    //can use global reduxStore
    useEffect(() => {
        // call logout(), if token expiers
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logOut = () => {
        dispatch({ type: LOGOUT })
        //update 'userState' for logOut
        //NOTE: use Any-value. both provide Extact same o/p
        // setUser(null)
        setUser(JSON.parse(localStorage.getItem('profile')))
        history.push('/'); //it will ensure reload of <App/> to reflect changes to other component    
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            {/* Brand logo */}
            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>

            {/* Sign in/out Button: react-Router used */}
            <Toolbar>
                {user ? (
                    // user=logged -> show detail and logoutBtn
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
                    </div>
                ) : (
                    // user=notLogged -> show loginBtn
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;