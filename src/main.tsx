import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не удалось найти корневой элемент root в index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);


