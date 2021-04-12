import React, { useRef, useState, useEffect } from 'react';

import classes from './ImageUpload.module.scss';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (props.notRequired) {
        setIsValid(true)
    }
  }, [props.notRequired])

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      if(props.addUpload) {props.addUpload()}
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    
    if(props.addUpload) {
      props.onInput(props.id, {file: pickedFile, number: props.number}, fileIsValid)
    } else {
      props.onInput(props.id, pickedFile, fileIsValid);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };


  return (
    <div className={props.center? classes.ImageUpload + " " + classes.Center :
                                  classes.ImageUpload}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}>
      </input>
      {previewUrl? 
        <div className={props.icon? classes.Preview + " " + classes.Icon :
                                     classes.Preview}>
          <img src={previewUrl} alt="Preview" width="100"/>
          {props.addUpload? <button type="button" onClick={props.removeImageHandler}>X</button> : null}
        </div>: null
      }
      {(!previewUrl || !props.addUpload)?
        <button className={classes.AddImage}
          type="button" onClick={pickImageHandler}>
          {props.buttonText}
        </button>
        : null}   
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;