import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { saveState, loadState } from './helpers/LocalStorage';

const initialState = loadState();

export const store  = createStore(reducers, initialState, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);


ReactDOM.render( 
<React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
</React.StrictMode>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
