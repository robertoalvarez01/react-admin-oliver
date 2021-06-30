import React from 'react';

import Navbar from './Navbar';
import SideBarMenu from './sidebarMenu';

function Layout(props) {
  // const children = props.children;

  return (
    <React.Fragment>
      <Navbar />
      <div className="row">
        <div className="col-2">
          <SideBarMenu/>
        </div>
        <div className="col-10">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;