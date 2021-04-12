import React from 'react';
import classes from './ImageUploads.module.scss';
import ImageUpload from '../ImageUpload/ImageUpload';


const ImageUploads = props => {

    const removeImageHandler = (removeId) => {
        props.setIdList(prev => prev.filter(i => i !== removeId))
    }

    const addUploadHandler = () => {
        props.setIdList(prev=> prev.concat(prev[prev.length - 1] + 1)) // add new id = last id of prev + 1
    }

    return (
        <div className={classes.ImageUploads}>
            {props.idList.map(i => 
                <ImageUpload
                    key={i}
                    number={i}
                    id={props.id}
                    onInput={props.onInput}
                    buttonText="+Add Image"
                    errorText="Please provide an image."
                    addUpload={addUploadHandler}
                    notRequired
                    removeImageHandler={() => removeImageHandler(i)}
            />)}
        </div>
    )
}

export default ImageUploads;
