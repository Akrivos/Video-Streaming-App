import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalContext from './context/GlobalContext';
import GlobalState from './context/GlobalContext';
import SignIn from './components/pages/SignIn';

ReactDOM.render(
        <GlobalState>
            <App/>
        </GlobalState>,
        document.querySelector('#root'));

