import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Route, BrowserRouter, withRouter } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './redux/reduxStore';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (this.props.initialized === false) {
      return <Preloader />
    } else {
      return (
        <BrowserRouter>
          <div className="app-wrapper">
            <HeaderContainer />
            <Navbar friendsData={this.props.friendsData} />
            <div className="app-wrapper-content">
              <Route render={() => (<ProfileContainer />)} path="/Profile/:userId?" />
              <Route render={() => (<DialogsContainer />)} path="/Dialogs" />
              <Route render={() => (<UsersContainer />)} path="/Users" />
              <Route render={() => (<Login />)} path="/Login" />
            </div>
          </div>
        </BrowserRouter >
      );
    }
  }
}
const mapStateToProps = (state) => ({
  friendsData: state.sidebar.friendsData,
  initialized: state.app.initialized
})



let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer store={store} />
    </Provider>
  </BrowserRouter>
}

export default MainApp;