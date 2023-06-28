import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name} //palceholder
      onChange={handleChange}
      variant='outlined' //common to all
      fullWidth
      label={label}
      type={type}

      // for passwaord: show/hide toggle-btn   
      InputProps={name==='password' || name=='confirmPassword'?{
        endAdornment:(
            <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
                {/* <Visibility /> and  <VisibilityOff />  are icons*/}
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }:null}

    />
  </Grid>
);

export default Input;