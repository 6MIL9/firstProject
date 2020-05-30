import React from 'react';
import classes from './Paginator.module.css';

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={classes.pages}>
            {pages.map(p => {
                return <span id={classes.item} className={currentPage === p && classes.selectedPage}
                    onClick={(e) => { onPageChanged(p) }}
                >{p}</span>
            })}
        </div>
    );
}



export default Paginator;

