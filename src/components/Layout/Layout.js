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
        <div className="flex flex-col min-h-screen overflow-hidden"> {/* Prevent scrollbar */}
          <main className="flex-grow pt-16 pb-16 overflow-hidden"> {/* Padding for header and footer */}
            <Routers /> {/* Your main content goes here */}
          </main>
        </div>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default Layout;
