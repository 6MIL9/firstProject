import React from 'react';
import { Field } from 'redux-form';
import classes from './FormsControls.module.css';

const FormControl = ({ input, meta: { touched, error }, element, children }) => {
    let hasError = touched && error;

    return (
        <div classesName={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}

export const TextArea = (props) => {

    const { input, meta, child, ...restProps } = props;


    return (
        <FormControl {...props}><textarea {...input} {...restProps} className={classes.textArea}/></FormControl>
    );
}

export const Input = (props) => {

    const { input, meta, child, ...restProps } = props;


    return (
        <FormControl {...props}><input {...input} {...restProps} /></FormControl>
    );
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return (
        <div>
            <Field className={classes.form} placeholder={placeholder} name={name} component={component} validate={validators} {...props} /> {text}
        </div>
    );
}


