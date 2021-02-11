import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import { getFilter } from './../../redux/userSelectors';
import { useSelector } from 'react-redux';

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendType = 'null' | 'true' | 'false'

type FormType = {
    term: string,
    friend: FriendType 
}

const usersSearchFormValidate = (values: FormType) => {
    const errors = {};
    return errors;
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getFilter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null: values.friend === "true" ? true : false
        } 


        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return <div>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm;
