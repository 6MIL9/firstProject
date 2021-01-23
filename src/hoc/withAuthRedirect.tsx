import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/reduxStore';

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & {}> = (props) => {
        let { isAuth, ...restProps } = props

        if (!props.isAuth) return <Redirect to='/login' />;

        return <WrappedComponent {...restProps as unknown as WCP} />
    }

    let connectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return connectedAuthRedirectComponent;
}

