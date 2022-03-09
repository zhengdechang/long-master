import React from 'react';
import ReactDOM from 'react-dom';
import './App.less';
import 'assets/base.less'
import reportWebVitals from './reportWebVitals';
import Routers from './routers'

ReactDOM.render(
  <Routers />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
