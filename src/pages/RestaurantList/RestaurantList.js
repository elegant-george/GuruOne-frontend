import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import classes from './RestaurantList.module.scss';
import RestaurantSimple from '../../container/RestaurantSimple/RestaurantSimple';
import RestaurantForm from '../../container/RestaurantForm/RestaurantForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import axios from 'axios';


const RestaurantList = (props) => {
    const district = useParams().district;
    const [isLoading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState();
    const [showForm, setShowForm] = useState(false);
    const [updateReminder, setUpdateReminder] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async() => {
          try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${district}`);
            setRestaurants(res.data.restaurants);
            setLoading(false);
          } catch (err) {
            console.log(err);
            setLoading(false);
          }
        };
        fetchRestaurants();
    }, [district, updateReminder])

    const showFormHandler = () => {
        setShowForm(true);
    }

    const closeFormHandler = () => {
        setShowForm(false);
    }

    return (
        <React.Fragment>
            <div className={classes.AddRestaurant}>
                <button 
                    onClick={showFormHandler}
                    disabled={!Boolean(localStorage.getItem('token'))}>
                    +Add Restaurant
                </button>
            </div>
            <Backdrop show={showForm} />
            {showForm? <RestaurantForm closeHandler={closeFormHandler} setUpdateReminder={setUpdateReminder}/> : null}
            {isLoading? <Spinner size="Big" /> : null}
            <div className={classes.RestaurantList}>
                {restaurants? restaurants.map(
                    restaurant => <RestaurantSimple
                                    key={restaurant._id}
                                    imgSrc={`${process.env.REACT_APP_ASSET_URL}/${restaurant.coverPhoto}`}
                                    rid={restaurant._id}
                                    rname={restaurant.name}
                                    rcontact={restaurant.contact}
                                    raddress={restaurant.address}
                                    rscore={restaurant.average}
                                    rdistrict={restaurant.district}
                                    ramount={restaurant.comments.length}/>)
                    : null}
            </div>
        </React.Fragment>
    )
};

export default RestaurantList;