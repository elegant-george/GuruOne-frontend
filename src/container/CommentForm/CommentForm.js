import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import ImageUploads from '../../components/ImageUploads/ImageUploads';
import {VALIDATOR_PASS} from '../../shared/validators';
import { useForm } from '../../shared/hooks/form-hook';
import classes from './CommentForm.module.scss';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const CommentForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [score, setScore] = useState('DEFAULT');
  const [picturesIdList, setPicturesIdList] = useState([0])
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: '',
        isValid: true
      },
      pictures: {
        value: [],
        isValid: true
      }
    },
    true
  );
  const restaurantId = useParams().restaurant

  const scoreHandler = event => {
    setScore(event.target.value)
  }

  const submitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', formState.inputs.description.value);
      formData.append('score', score);
      formState.inputs.pictures.value
        .filter(el => picturesIdList.includes(el.number))
        .forEach(el => {formData.append('pictures', el.file);});
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment/add/${restaurantId}`, formData,
        {headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}});
      props.setUpdateReminder(prev => !prev);
      setLoading(false);
      props.closeHandler();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.CommentForm} onSubmit={submitHandler}>
        <div className={classes.CloseForm}>
          <button  onClick={props.closeHandler}>X</button>
        </div>
        <label>
          Score
          <select defaultValue={score} onChange={scoreHandler}>
            <option disabled value="DEFAULT" className={classes.notDisplay}>-- give score --</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <Input
          id="description"
          element="textarea"
          label="Description"
          initialValid={true}
          validators={[VALIDATOR_PASS()]}
          errorText=""
          onInput={inputHandler}
        />
        <ImageUploads id="pictures" idList={picturesIdList} setIdList={setPicturesIdList} onInput={inputHandler}></ImageUploads>
        {isLoading? <Spinner size="Small"/> : 
          <button className={classes.SubmitComment}
            type="submit" disabled={score === 'DEFAULT'}>
            Submit
          </button>}
      </form>
    </React.Fragment>
  );
};

export default CommentForm;