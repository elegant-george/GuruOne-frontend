import React, { useState } from 'react';
import { useParams} from "react-router";
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import ImageUploads from '../../components/ImageUploads/ImageUploads';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { VALIDATOR_REQUIRE, VALIDATOR_PASS} from '../../shared/validators';
import { useForm } from '../../shared/hooks/form-hook';
import classes from './RestaurantForm.module.scss';

import axios from 'axios';

const RestaurantForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      contact: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      about: {
        value: '',
        isValid: true
      },
      coverPhoto: {
        value: null,
        isValid: true
      },
      menu: {
        value: [],
        isValid: true
      },
      pictures: {
        value: [],
        isValid: true
      }
    },
    false
  );
  const [menuIdList, setMenuIdList] = useState([0]);
  const [picturesIdList, setPicturesIdList] = useState([0])
  const district = useParams().district


  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('district', district);
      formData.append('contact', formState.inputs.contact.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('about', formState.inputs.about.value);
      formData.append('coverPhoto', formState.inputs.coverPhoto.value);
      formState.inputs.menu.value
        .filter(el => menuIdList.includes(el.number))
        .forEach(el => {formData.append('menu', el.file);});
      formState.inputs.pictures.value
        .filter(el => picturesIdList.includes(el.number))
        .forEach(el => {formData.append('pictures', el.file);});

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/restaurant/add`, formData,
        {headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}});
      setLoading(false)
      props.setUpdateReminder(prev => !prev);
      props.closeHandler();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };


  return (
    <React.Fragment>
      <form className={classes.RestaurantForm} onSubmit={submitHandler}>
        <div className={classes.CloseForm}>
          <button  onClick={props.closeHandler}>X</button>
        </div>
        <Input
          id="name"
          element="input"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="contact"
          element="input"
          label="Contact"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="about"
          element="textarea"
          label="About"
          initialValid={true}
          validators={[VALIDATOR_PASS()]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <p className={classes.Bold}>Cover Photo</p>
        <ImageUpload id="coverPhoto" center buttonText={"Pick Image"} onInput={inputHandler}></ImageUpload>
        <p className={classes.Bold}>Menu</p>
        <ImageUploads id="menu" idList={menuIdList} setIdList={setMenuIdList} onInput={inputHandler}></ImageUploads>
        <p className={classes.Bold}>Pictures</p>
        <ImageUploads id="pictures" idList={picturesIdList} setIdList={setPicturesIdList} onInput={inputHandler}></ImageUploads>
        {isLoading? <Spinner size="Small"/> : 
          <button className={classes.SubmitComment} disabled={!formState.isValid}
            type="submit" >
            Submit
          </button>}
      </form>
    </React.Fragment>
  );
};

export default RestaurantForm;