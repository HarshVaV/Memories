
import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
      case AUTH:
        console.log(action.type)
        console.log(action.payload)
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
  
        return { ...state, authData: action?.paload };
      case LOGOUT:
        localStorage.clear();
  
        return { ...state, authData: null };
      default:
        return state;
    }
  };
  
  export default authReducer;