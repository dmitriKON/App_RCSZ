import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/urls';

const jwtReducer = (state = null, action) => {
   switch(action.type) {
      case ActionTypes.CHANGE_JWT:
         console.log(action.payload)
         return action.payload

      case ActionTypes.LOGOUT:
         for (let i = 0; i < 4; i++) {
            if (window.location.href === `${baseUrl}home` || window.location.href === 'http://localhost:3000'|| window.location.href === `${baseUrl}`) break;
            window.history.back()
         }
         document.location.reload(true)
         window.location.replace(`${baseUrl}login`);
         return null;
         
      default:
         return state;
   }
}

export default jwtReducer;