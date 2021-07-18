import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import {ThemeProvider} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import * as serviceWorker from './serviceWorker';
import AppContainer from './components/App/AppContainer';
import theme from './layout/theme';
import store from './store';

import './index.css';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</MuiPickersUtilsProvider>
	</ThemeProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
