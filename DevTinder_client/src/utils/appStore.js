import { configureStore } from '@reduxjs/toolkit'
import uesrReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestReducer from './requestSlice'

export const store = configureStore({
  reducer: {
    user: uesrReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer
  },
})
