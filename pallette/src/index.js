import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}><Router><App /></Router></Provider>
, document.getElementById('root'));