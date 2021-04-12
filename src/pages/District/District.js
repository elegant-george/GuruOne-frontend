import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './District.module.scss';
import { districts } from '../../shared/districtList';

const District = (props) => {

    return (
        <div className={classes.District}>
            <nav>
            <ul>
                {districts.map(dis => <li  key={dis}>
                        <NavLink to={`/restaurant/${dis}/`} >
                            {dis}
                        </NavLink>
                    </li>)}
            </ul>
            </nav>
        </div>
    )
}

export default District;