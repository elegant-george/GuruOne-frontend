import React from 'react';
import { NavLink } from 'react-router-dom';
import {activeColor} from '../../shared/constWord';
import classes from './Navigation.module.scss';

const Navigation = props => {
  const rightCorner  = props.logined?  (
      <nav>
          <ul>
            <li>
              <NavLink to="/" >
                <button onClick={props.logout}>logout</button>
              </NavLink>
            </li>
          </ul>
      </nav>
    ): (
      <nav>
          <ul>
            <li>
              <NavLink to="/login"
                activeStyle={{color: activeColor}}>login</NavLink>
            </li>
            <li>
              <NavLink to="/signup"
                activeStyle={{color: activeColor}}>signup</NavLink>
            </li>
          </ul>
      </nav>
    )
  return (
    <div className={classes.MainHeader}>
      {rightCorner}
    </div>
  );
};

export default Navigation;