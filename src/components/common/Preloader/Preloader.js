import React from 'react';
import classes from './Preloader.module.css';
import preloader from '../../../assets/img/preloader.gif';

let Preloader = (props) => {
    return (
        <div className={classes.preloaderContainer}>
            <img src={preloader} alt='' />
        </div>
    );
}

export default Preloader;