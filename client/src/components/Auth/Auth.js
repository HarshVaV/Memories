import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// GoogleAuth
import { GoogleLogin, googleLogout } from '@react-oauth/google'; 
      // prior is </>, latter is fun()
import jwtDecode from 'jwt-decode';

import Icon from './icon';
// import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
    const classes = useStyles();
    const dispatch=useDispatch()
    const history = useHistory();
    //utilize useState()-Hook to store all state-Variables
    // As useState(), ensure re-rendering, if state-changes

    const [isSignup, setIsSignup] = useState(false);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        //reset showPassowrd->false
        setShowPassword(false)
    }

    const [showPassword, setShowPassword] = useState(false);
    // NOTE: whenever, newState is created of altering oldState, alway use callback() inside setState()
    const handleShowPassword = () => setShowPassword((prevshowPassword) => !prevshowPassword)

    // Google Function
    const googleSuccess = (response) => {
        const userInfo=jwtDecode(response.credential)
        const token = response.credential; //add 'token' field explicitly

        console.log(userInfo)

        try {
            // add token-field seprately, as used by api.Interceptors
            dispatch({ type: AUTH, payload: {...userInfo, 'token':token, 'googleToken':true} });
            
            history.length>1
            ?history.goBack() //redirect to prevPage
            :history.push('/') //redirect to "/" if no-prevPage exist
            
          } catch (error) {
            console.log(error);
          }
        

    }
    const googleError = (err) => {
        console.log(err)
        alert('Google Sign In was unsuccessful. Try again later');
    }
    //collect formData
    const initialState={firstName:'', lastName:'', email:'',password:'',confirmPassword:''}
    const [form,setForm]=useState(initialState);

    const handleChange = (e) => {
        // NOTE: keyName and e.target.name must be same
        setForm({...form,[e.target.name]:e.target.value })
            // must use spread-operator, to keep already present data
     }
     const handleSubmit = (e) => {
        e.preventDefault(); //to avoid reloadPage
    
        if (isSignup) {
          dispatch(signup(form, history)); 
        } else {
          dispatch(signin(form, history));
        }
        // pass histroy-variable, so that redirecting can occur
        // actionCreators will be async
      };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                {/* Icon of LOCK */}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                {/*  TITLE: toggle(SignIn TITLE, SignUp TITLE) */}
                <Typography component="h1" variant="h5">
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>
                {/* Form: detailFiled + buttons*/}
                <form className={classes.form} onSubmit={handleSubmit}>
                    {/* Input-detail-Form: use <Input/> components */}
                    <Grid container spacing={2}>
                        {/* Show for signUp-only */}
                        {isSignup &&
                            (<>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>)
                        }

                        {/* Always Show */}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        {/* as per the state-showPassword-> pass appropiate value as props */}
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {/* Show for signUp-only */}
                        {isSignup &&
                            (<>
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            </>)
                        }


                    </Grid>

                    {/*  Button-toggle(SignIn btn, SignUp btn) */}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    {/* GoogleLogin btn */}

                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleError}

                        // use in-built props to manupulate functionality
                        theme='filled_blue' 
                        size='large'
                    />


                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            {/* LOGIC for toggle(Already SignUp?, Want to SignUp?) */}
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth




