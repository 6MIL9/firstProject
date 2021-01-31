import React from 'react';
import Class from './Preloader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

let Preloader: React.FC = () => {
    return (
        <div className={Class.wrapper}>
            <div>
                <FontAwesomeIcon icon={faSpinner} className="fas fa-spinner fa-spin" size="3x" color="#666" />
            </div>

        </div>
    );
}

export default Preloader;