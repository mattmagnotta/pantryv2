import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Wrapper';
import * as serviceWorker from './serviceWorker';
import {UserProvider,UserContext, UserDispatchContext} from './Context'


ReactDOM.render(<Wrapper/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
