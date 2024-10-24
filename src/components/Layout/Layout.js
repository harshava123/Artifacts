import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Header from '../Header/Header';
import Routers from '../../Routers/Routers';
import Footer from '../Footer/Footer';

function Layout() {
  return (
    <Router> {/* Wrap your component in Router */}
      <Fragment>
        <Header />
        <div>
          <Routers />
        </div>
        <Footer/>
      </Fragment>
    </Router>
  );
}

export default Layout;
