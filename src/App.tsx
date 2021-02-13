import React, { ComponentType } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from './components/Navbar/Navbar';
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
import { Button,  } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


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
          {/* <nav className={classes.nav}> 
                <div className={classes.item}>
                    <NavLink to="/Users" className={classes.link} activeClassName={classes.activeLink}>Users</NavLink>
                </div>

                <div className={classes.item}>
                    <NavLink to="/Settings" className={classes.link} activeClassName={classes.activeLink}>Settings</NavLink>
                </div>
            </nav> */}
          <Header className="header">
            <div className="logo" />
          </Header>
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
                  // defaultSelectedKeys={['1']}
                  // defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Switch>
                  <Route render={() => <SuspendedDialogs />} path='/dialogs' />
                  <Route render={() => <SuspendedProfile />} path='/profile/:userId?' />
                  <Route exact render={() => (<Redirect to={"/Login"} />)} path='/' />
                  <Route exact render={() => (<Redirect to={"/Login"} />)} path='/firstProject' />
                  <Route render={() => (<UsersPage />)} path="/Users" />
                  <Route render={() => (<Login />)} path="/Login" />
                  <Route render={() => (<SettingsContainer />)} path="/Settings" />
                  <Route render={() => (<div>404 NOT FOUND
                    <Button type={'primary'}>sadf</Button>
                  </div>)} />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        // <div>
        //   <Header />
        //   <div className="clone"></div>
        //   <div className="app-wrapper">
        //     <Navbar />
        //     <div className="app-wrapper-content">
        //     </div>
        //   </div >

        // </div >
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