import React from 'react';
import { Container } from '@material-ui/core';

import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

//for googel-Auth
import { GoogleOAuthProvider } from '@react-oauth/google';
import { client } from './api';


//For multiPage react-App
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';



function App (){ 
  
  // const user = JSON.parse(localStorage.getItem('profile'));
  return (
  <GoogleOAuthProvider clientId={"977551993955-4ehikh2g2frurola89n2jtdd240oesuv.apps.googleusercontent.com"}>
    <BrowserRouter>
      <Container maxWidth="xl">
        {/* NavBar-> since outside <Switch/>, visible always */}
        <Navbar />
        <Switch>
          {/* <Home/> and <Auth>: visible 1-at-a-time (as inside <Switch/>) */}

          {/* STEP1: always redirect form '/' to '/posts' */}
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
          {/* STEP2a: conditonal rendering of <Home/> */}
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
          {/* STEP2b: conditonal rendering of <PostDetails/> */}  
            <Route path="/posts/:id" exact component={PostDetails} />
          {/* STEP2c: conditonal rendering of </Auth> */}
            <Route path="/auth" exact component={() => (!JSON.parse(localStorage.getItem('profile')) ? <Auth /> : <Redirect to="/posts" />)} />
                {/* Ensure redirection-> if(userLogged) */}
        </Switch>
      </Container>
    </BrowserRouter>
  </GoogleOAuthProvider>
)};

export default App;