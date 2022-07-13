import * as ActionTypes from './ActionTypes';
import { requestUrl } from '../shared/urls';
import axios from 'axios';


 export const changeJwt = jwt => ({
    type: ActionTypes.CHANGE_JWT,
    payload: jwt
 })

 export const logOut = () => ({
   type: ActionTypes.LOGOUT
})

export const profile = async (jwt) => {
   try {
      const response = await axios.get(`${requestUrl}profile`, {
         headers: {
            Authorization: `Bearer ${jwt}`
         }
      });
      return response.data;
   } catch (err) {
      console.log('ERROR Self Info', err.message);
   }
}