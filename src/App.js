import React, {useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Header from './container/Header/Header';
import Footer from './container/Footer/Footer';
import District from './pages/District/District';
import Restaurant from './pages/Restaurant/Restaurant';
import RestaurantList from './pages/RestaurantList/RestaurantList';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import User from './pages/User/User';
import * as actions from './store/actions/index';


const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      {props.isLogined? null : <Route path='/signup' component={SignUp} />}
      {props.isLogined? null : <Route path='/login' component={LogIn} />}
      <Route path='/restaurant/:district/:restaurant' component={Restaurant} />
      <Route path='/restaurant/:district' exact component={RestaurantList} />
      <Route path='/user/:userId' exact component={User} />
      <Route path="/" exact component={District} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <React.Fragment>
      <Header />
      <main>
        {routes}
      </main>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isLogined: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
