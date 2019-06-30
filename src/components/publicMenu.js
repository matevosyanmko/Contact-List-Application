import React from 'react';
import { PublicRoutes } from '../constants/routes';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export const PublicMenu = () => (
  <Menu mode="horizontal">
    {PublicRoutes.map((item, key) => {
      return item.key !== 4 ? (
        <Menu.Item key={key}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            {item.name}
          </Link>
        </Menu.Item>
      ) : null;
    })}
  </Menu>
);
