import React, { Component } from 'react';
import SideBarMenu from '../components/sidebarMenu';
import BoxBalance from '../components/BoxBalance/boxBalance';
import Calendario from '../components/Calendario/Calendario';
export default class Home extends Component {

  render() {
    return (
        <div className="row">
          <div className="col-2">
            <SideBarMenu/>
          </div>
          <div className="col-10">
            <div className="container my-5">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3">
                    <BoxBalance valor={23} label="ventas" icon="fas fa-money-bill-alt"/>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <BoxBalance valor={10} label="Usuarios" icon="fas fa-users"/>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <BoxBalance valor={13500} label="Recaudación hoy" icon="fas fa-cash-register"/>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <BoxBalance valor={16} label="Sin stock" icon="fas fa-exclamation"/>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <Calendario/>
                  </div>
                </div>
            </div>
          </div>
        </div>
    );
  }
}
