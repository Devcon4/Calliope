import React from 'react';
import Styles from './app.module.css';
import ClHeader from '../Header/header.component';

export default function ClApp() {
    return (
        <div
            className={`${Styles.background}`}
        >
            <h1>I work!</h1>
            <ClHeader />
        </div>
    );
};
