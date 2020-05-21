import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

let mapStateToPropsForRedirect = (state) => {
    return {
        isLogin: state.auth.isLogin
    }
}

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isLogin) return <Redirect to='/login' />;

            return <Component {...this.props} />
        }
    }

    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return connectedAuthRedirectComponent;
}

