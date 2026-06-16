import {configureStore} from '@reduxjs/toolkit'
import listingReducer from './listingSlice'
import chatReducer from './chatSlice'

export const store=configureStore({
    reducer:{
        listing:listingReducer,
        chat: chatReducer
    }
})