import { configureStore } from '@reduxjs/toolkit'
import uesrReducer from './userSlice'
import feedReducer from './feedSlice'

export const store = configureStore({
  reducer: {
    user: uesrReducer,
    feed: feedReducer
  },
})
