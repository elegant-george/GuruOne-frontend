import React from 'react';
import { NavLink } from 'react-router-dom';
import FancyScore from '../../components/FancyScore/FancyScore';

import classes from './Comment.module.scss';

const Comment = (props) => (
    <div className={classes.Comment}>
        <NavLink className={classes.Icon} to={`/user/${props.cauthor_id}`} >
            {props.cauthor_icon? <img src={`${process.env.REACT_APP_ASSET_URL}/${props.cauthor_icon}`} 
                alt="author_icon" 
                width="100" 
                height="100" /> : null}
        </NavLink>
        <FancyScore score={props.cscore} />
        <p className={classes.Author}>author: {props.cauthor_name}</p>
        {props.cdescription? <p>description: {props.cdescription}</p> : null}
        {props.cpictures ? props.cpictures.map(pic => 
            <img className={ classes.Picture }
                src={`${process.env.REACT_APP_ASSET_URL}/${pic}`} 
                alt="pictures" 
                key={pic} 
                width="100" 
                height="100" />)
            : null}
    </div>

);

export default Comment;