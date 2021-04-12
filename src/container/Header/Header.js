import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import classes from './Header.module.scss';
import restaurantIcon from '../../icons/icons8-restaurant-50.png'
import Navigation from '../../components/Navigation/Navigation';

const Header = (props) => {
    return (
        <header className={classes.Header}>
          <div className={classes.Toolbar}>
            <nav>
                <NavLink to='/'>
                    <img src={restaurantIcon} alt="RestaurantIcon" />
                </NavLink>
            </nav>
            <Navigation logined={props.isLogined} logout={props.onLogout}/>
          </div>
        </header>
    )
}

const mapStateToProps = state => {
    return {
      isLogined: state.auth.token !== null,
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);