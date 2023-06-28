import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

//async ActionCreator for signIn
export const signin = (formData, router) => async (dispatch) => {
  try {
    //step1: call-Api
    const { data } = await api.signIn(formData);

    //step2: dispatch(action)
    dispatch({ type: AUTH, payload:{...data.result,'token':data.token} });
      // NOTE: from backend userInfo is in data.result

    //Step3:redirect to home: use 'history' aka 'router'
      router.length>1
      ?router.goBack() //redirect to prevPage
      :router.push('/') //redirect to "/" if no-prevPage exist

  } catch (error) {
    console.log(error);
  }
};

//async ActionCreator for signIn
export const signup = (formData, router) => async (dispatch) => {
  try {
    //step1: call-Api
    console.log(formData)
    const { data } = await api.signUp(formData);
    
    //step2: dispatch(action)
    dispatch({ type: AUTH, payload:{...data.result,'token':data.token} });
      // NOTE: from backend userInfo is in data.result
  
    //Step3:redirect to home: use 'history' aka 'router'
      router.length>1
      ?router.goBack() //redirect to prevPage
      :router.push('/') //redirect to "/" if no-prevPage exist
  } catch (error) {
    console.log(error);
  }
};