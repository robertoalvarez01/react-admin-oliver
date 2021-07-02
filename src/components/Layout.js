import React from 'react';
import {isMobile} from '../helpers/helpers';
import Navbar from './Navbar';
import SideBarMenu from './sidebarMenu';

function Layout(props) {
  // const children = props.children;

  return (
    <React.Fragment>
      <Navbar />
      {isMobile() ? props.children :
        <div className="row">
          <div className="col-md-2">
            <SideBarMenu/>
          </div>
          <div className="col-12 col-md-10">
            {props.children}
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default Layout;