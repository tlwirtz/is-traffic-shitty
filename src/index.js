import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .catch(err => console.log(`Not registered ${err}`));
}

ReactDOM.render(<App />, document.getElementById('root'));
