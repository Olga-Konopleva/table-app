import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import persistedStore from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={persistedStore.store}>
      <PersistGate persistor={persistedStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
