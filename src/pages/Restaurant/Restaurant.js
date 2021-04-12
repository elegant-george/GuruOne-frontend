import React, {useState, useEffect} from 'react';
import classes from './Restaurant.module.scss';
import FancyScore from '../../components/FancyScore/FancyScore';
import Comment from '../../container/Comment/Comment';
import CommentForm from '../../container/CommentForm/CommentForm';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useParams } from 'react-router-dom';

import axios from 'axios';


const Restaurant = (props) => {

    const restaurantId = useParams().restaurant;
    const district = useParams().district;
    const [isLoading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState();
    const [updateReminder, setUpdateReminder] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async() => {
          try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${district}/${restaurantId}`);
            setRestaurant(res.data.restaurant);
            setLoading(false);
          } catch (err) {
            console.log(err);
            setLoading(false);
          }
        };
        fetchRestaurant();
    }, [district, restaurantId, updateReminder])

    const [showForm, setShowForm] = useState(false);
    const showFormHandler = () => {
        setShowForm(true);
    }

    const closeFormHandler = () => {
        setShowForm(false);
    }

    return (
        <React.Fragment>
            <Backdrop show={showForm} />
            {showForm? <CommentForm closeHandler={closeFormHandler} setUpdateReminder={setUpdateReminder}/> : null}
            <div className={classes.WriteComment}>
                <button 
                    onClick={showFormHandler} disabled={!Boolean(localStorage.getItem('token'))}>
                    +Write Comment
                </button>
            </div>
            {isLoading? <Spinner size="Big" /> : null}
            {restaurant? 
                <React.Fragment>
                    <div className={classes.Restaurant}>
                        <img className={classes.GridItem1} 
                            src={`${restaurant.coverPhoto}`} 
                            alt="" width="450"/>
                        <div className={classes.GridItem2}>
                            <FancyScore  score={restaurant.average === -1 ? 0 : restaurant.average.toFixed(1)}/>
                            <p>{restaurant.average === -1 ? '--' : restaurant.average.toFixed(1)} out of 5</p>
                            <p>{restaurant.comments.length} reviews</p>
                        </div>
                        <p className={classes.GridItem3}>name: {restaurant.name}</p>
                        <p className={classes.GridItem4}>contact: {restaurant.contact}</p>
                        <p className={classes.GridItem5}>address: {restaurant.district + restaurant.address}</p>
                        <p className={classes.GridItem6}>about: {restaurant.about}</p>
                        <p className={classes.GridItem7}>menu: {restaurant.menu.map((menu_pic, i) =>
                            <img key={`menu${i}`}src={`${menu_pic}`} alt="menu" width="100"/>)}
                        </p>
                        <p className={classes.GridItem8}>pictures: {restaurant.pictures.map((pic, i) =>
                            <img key={`pic${i}`}src={`${pic}`} alt="" width="100" />)}
                        </p>
                    </div>
                    <div className={classes.RestaurantComments} >
                        {restaurant.comments.map(comment => 
                            <Comment 
                                key={comment._id}
                                cscore={comment.score}
                                cpictures={comment.pictures}
                                cdescription={comment.description}
                                cauthor_id={comment.author._id}
                                cauthor_icon={comment.author.icon}
                                cauthor_name={comment.author.name}
                            />)}
                    </div>
                </React.Fragment> : null}
        </React.Fragment>
    )
};

export default Restaurant;