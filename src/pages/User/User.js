import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classes from './User.module.scss';
import FancyScore from '../../components/FancyScore/FancyScore';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from 'axios'


const User = (props) => {

    const userId = useParams().userId;
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`);
            setUser(res.data.user);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        };
        fetchUser();
    }, [userId])

    return (
        <React.Fragment>
            <div className={classes.MarginTop} />
            {isLoading? <Spinner size="Big" /> : null}
            {user?
                <React.Fragment>
                    <div className={classes.UserProfile}>
                        <img className={classes.GridItem1} 
                            src={`${user.icon}`} 
                            alt="user icon" 
                            width="200"
                            height="200" />
                        <div className={classes.GridItem2}>
                            <p>writed {user.comments.length} reviews</p>
                            <p>average gives: {user.average === -1? '--' :user.average.toFixed(1)} stars</p>
                        </div>
                        <p className={classes.GridItem3}>{user.name}</p>
                    </div>
                    <div className={classes.Comments}>
                        <p>{user.name}'s comments:</p>
                        {user.comments.map(comment => 
                            (<div key={comment.id} className={classes.Comment}>
                                <div className={classes.CGridContainer}>
                                    <p className={classes.CGridItem1}>restaurant: {comment.restaurant.name}</p>
                                    <NavLink className={classes.CGridItem2}
                                        to={`/restaurant/${comment.restaurant.district}/${comment.restaurant.id}/`} >
                                        more
                                    </NavLink>
                                    <FancyScore score={comment.score}/>
                                </div>
                                
                                {comment.description? <p>description: {comment.description}</p> : null}
                                {comment.pictures? comment.pictures.map(picture => 
                                    <img key={picture} 
                                        src={`${picture}`} 
                                        alt="" 
                                        width="100"
                                        height="100"/>) : null }
                            </div>))}
                    </div> 
                </React.Fragment>: null}
            </React.Fragment>);
}

export default User;