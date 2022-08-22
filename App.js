import * as React from 'react';
import { Provider } from 'react-redux'
import store from './src/app/store';
import MainNaviagtor from './src/app/MainNaviagtor'

function App() {
  return (
    <Provider store={store}>
      <MainNaviagtor />
    </Provider>
  );
}


export default App;