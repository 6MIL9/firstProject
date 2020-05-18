import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Route, BrowserRouter } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login'

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar friendsData={props.store.getState().sidebar.friendsData}/>
        <div className="app-wrapper-content">
          <Route render={() => (<ProfileContainer />)} path="/Profile/:userId?" />
          <Route render={() => (<DialogsContainer />)} path="/Dialogs" />
          <Route render={() => (<UsersContainer/>)} path="/Users" />
          <Route render={() => (<Login/>)} path="/Login" />
          
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
