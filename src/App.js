import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from './constants/routes';
import ScrollToTop from './utils';
// assets
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          {Routes.map((item, key) => (
            <Route exact path={item.path} render={(params) => <item.component {...params} />} key={key} />
          ))}
          <Redirect to="/page/1" />
        </Switch>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnVisibilityChange draggable pauseOnHover />
      </ScrollToTop>
    </BrowserRouter>
  );
};
export default App;
