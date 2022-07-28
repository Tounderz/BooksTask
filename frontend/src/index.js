import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BooksStore from './store/BooksStore'

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
      book: new BooksStore()
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root')
);