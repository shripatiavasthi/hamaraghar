// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './counterSlice'
// 

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// })

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apislices } from './apislices'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apislices.reducerPath]: apislices.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apislices.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)