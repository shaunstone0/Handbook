import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Redux
import { loadUser } from './actions';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers/index';
import CreateForm from './components/CreateEntry/CreateForm';
import EditForm from './components/UpdateEntry/EditForm';

// Components
import App from './components/App/App';
import Login from './components/Auth/Login';
import FullQuestion from './components/FullEntry/FullQuestion';
import SpinnerScreen from './components/Spinner/Spinner';
import PrivateRoute from './components/Routing/PrivateRoute';
import Navbar from './components/NavBar/Navbar';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';

// Create redux store
const middleware = [thunk];
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

library.add(fas);

const Root = ({ isAuthenticated, isLoading, user }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return isLoading ? (
    <SpinnerScreen />
  ) : (
    <div className='full-container'>
      <Navbar />

      <Switch>
        <PrivateRoute
          exact
          path='/'
          component={App}
          isAuthenticated={isAuthenticated}
          user={user}
        />
        <PrivateRoute
          exact
          path='/handbook/fullquestion'
          component={FullQuestion}
        />
        <PrivateRoute exact path='/handbook/create' component={CreateForm} />
        <PrivateRoute exact path='/handbook/edit' component={EditForm} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.user.isLoading,
  user: state.user.currentUser,
});

const RootWithRouter = withRouter(connect(mapStateToProps, { loadUser })(Root));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
