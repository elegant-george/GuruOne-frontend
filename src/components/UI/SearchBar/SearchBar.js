import React, {useState} from 'react';
import classes from './SearchBar.module.scss';


const SearchBar = props=> {

    const [searchString, setSearchString] = useState('');

    const inputChangedHandler = (event) => {
      setSearchString(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      console.log(searchString)
      //props.search(searchString);
    };

    return(
      <div className={classes.Search}>
        <form onSubmit={submitHandler}>
          <label htmlFor="rsearch"/>
            <input  type="search"
                            placeholder="Search..."
                            value={searchString}
                            onChange={event => inputChangedHandler(event)}
                            autoComplete='off'
                            id="rsearch" />
            <button>
              <i className="fa fa-search searchIcon"></i>
              </button>

        </form>
      </div>
    )
};

  export default SearchBar;