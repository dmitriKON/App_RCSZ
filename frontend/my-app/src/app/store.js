import { configureStore } from '@reduxjs/toolkit';
import jwtReducer from '../features/redux/jwtReducer'

export const Store = () => {
  const store = configureStore({
    reducer: {
      jwt: jwtReducer
    }
  })

  return store
}