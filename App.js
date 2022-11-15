import * as React from 'react';
import { Provider } from 'react-redux'
import store from './src/app/store';
import MainNaviagtor from './src/app/MainNaviagtor';
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"


let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading....</Text>} persistor={persistor}>
        <MainNaviagtor />
      </PersistGate>
    </Provider>
  );
}


export default App;