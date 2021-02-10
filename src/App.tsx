import React, { ComponentType } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route, BrowserRouter, withRouter, Redirect, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/reduxStore';
import { withSuspense } from "./hoc/withSuspense";
import SettingsContainer from './components/Settings/SettingsContainer';
import UsersPage from './components/Users/UsersPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfilePage)


class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log(e);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {

    if (this.props.initialized === false) {
      return <Preloader />
    } else {
      return (
        <div>
          <HeaderContainer />
          <div className="clone"></div>
          <div className="app-wrapper">
            <Navbar />
            <div className="app-wrapper-content">
              <Switch>
                <Route render={() => <SuspendedDialogs/>} path='/dialogs' />
                <Route render={() => <SuspendedProfile/>} path='/profile/:userId?' />
                <Route exact render={() => (<Redirect to={"/Login"} />)} path='/' />
                <Route exact render={() => (<Redirect to={"/Login"} />)} path='/firstProject' />
                <Route render={() => (<UsersPage />)} path="/Users" />
                <Route render={() => (<Login />)} path="/Login" />
                <Route render={() => (<SettingsContainer />)} path="/Settings" />
                <Route render={() => (<div>404 NOT FOUND</div>)} />
              </Switch>
            </div>
          </div >

        </div >
      );
    }
  }
}
const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;