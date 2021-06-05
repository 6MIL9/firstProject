import React, { ComponentType } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Route, BrowserRouter, withRouter, Redirect, Switch, Link } from "react-router-dom";
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
// import Header from './components/Header/Header';
import { Button } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import AppHeader from './components/Header/Header';
import ChatPage from './pages/Chat/ChatPage';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


const DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs'));
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
        <Layout>
          <AppHeader />
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  style={{ height: '100%' }}
                >
                  <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/Settings">Settings</Link></Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Switch>
                  <Route render={() => <SuspendedDialogs />} path='/dialogs' />
                  <Route render={() => <SuspendedProfile />} path='/profile/:userId?' />
                  <Route exact render={() => (<Redirect to={"/login"} />)} path='/' />
                  <Route exact render={() => (<Redirect to={"/login"} />)} path='/firstProject' />
                  <Route render={() => (<UsersPage />)} path="/users" />
                  <Route render={() => (<Login />)} path="/login" />
                  <Route render={() => (<SettingsContainer />)} path="/settings" />
                  <Route render={() => (<ChatPage />)} path="/chat" />
                  <Route render={() => (<div>404 NOT FOUND
                    <Button type={'primary'}>sadf</Button>
                  </div>)} />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Social Network ©2021 Created by Emil Kliavlin</Footer>
        </Layout>
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