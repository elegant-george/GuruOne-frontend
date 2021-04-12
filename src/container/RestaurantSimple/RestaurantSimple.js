import React from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import classes from './RestaurantSimple.module.scss';
import FancyScore from '../../components/FancyScore/FancyScore'

const RestaurantSimple = (props) => {

    const district = useParams().district;

    return (
        <div className={classes.RestaurantSimple}>
            <img className={classes.GridItem1} src={props.imgSrc} alt="restaurant icon" width="100" height="100"/>
            <div className={classes.GridItem2}>
                <FancyScore  score={props.ramount === 0? 0 : props.rscore}/>
                <p>{props.ramount === 0? "--" : props.rscore} out of 5</p>
                <p>{props.ramount} reviews</p>
            </div>
            <NavLink className={classes.GridItem3} to={`/restaurant/${district}/${props.rid}/`} >
                more
            </NavLink>
            <p className={classes.GridItem4}>name: {props.rname}</p>
            <p className={classes.GridItem5}>contact: {props.rcontact}</p>
            <p className={classes.GridItem6}>address: {props.rdistrict + props.raddress}</p>
        </div>
    )
};

export default RestaurantSimple;