import React from "react";
import classes from './FancyScore.module.scss';
import Star from '../Star/Star';

const FancyScore = props => {
    let stars = [];
    const filled = Math.floor(props.score);
    for (let i = 0; i < filled; i++) {
        stars.push(<Star key={i} filled={true}/>)
    }
    for (let i = filled; i < 5; i++) {
        stars.push(<Star key={i} filled={false}/>)
    }
  return (
    <div className={classes.FancyScore}>
        {stars}
    </div>
  );
}

  export default FancyScore;