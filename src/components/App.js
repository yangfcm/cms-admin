import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from '../store';
import AppRouter from '../routers/AppRouter';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline />
        <AppRouter />      
      </Provider>
    )
  }
}

export default App;