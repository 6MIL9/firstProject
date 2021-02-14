import React from 'react';
import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { logout } from './../../redux/authReducer';
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import Avatar from 'antd/lib/avatar/avatar';

const AppHeader: React.FC = () => {
  const login = useSelector((state: AppStateType) => state.auth.login)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()
  const logoutCB = () => {
    dispatch(logout())
  }

  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/Users">Users</Link></Menu.Item>
          </Menu>
        </Col>
        {isAuth ? <>
          <Col span={1}>
            <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Col>
          <Col span={5}>
            <Button onClick={logoutCB}>Logout</Button>
          </Col>
        </> :
          <Col span={6}>
            <Button><Link to='/login'>Login</Link></Button>
          </Col>}
      </Row>
    </Header>
  );
}

export default AppHeader;