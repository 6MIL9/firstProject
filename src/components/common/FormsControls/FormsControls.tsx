import React from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'
import classes from './FormsControls.module.css'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
    let hasError = touched && error;

    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {

    const { input, meta, children, ...restProps } = props;


    return (
        <FormControl {...props}><textarea {...input} {...restProps} className={classes.textArea} /></FormControl>
    );
}

export const Input: React.FC<WrappedFieldProps> = (props) => {

    const { input, meta, children, ...restProps } = props;


    return (
        <FormControl {...props}><input {...input} {...restProps} /></FormControl>
    );
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {},
    style?: object) {
    return (
        <div>
            <Field className={classes.form} 
            placeholder={placeholder} 
            name={name} 
            component={component} 
            validate={validators} 
            style={style} 
            {...props} />
        </div>
    );
}


