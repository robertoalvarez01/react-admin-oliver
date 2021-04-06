import React from 'react';
import { Link } from 'react-router-dom';

// import './styles/BadgesList.css';

class BannerListItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.banner.descripcion}</th>
        <td>{(this.props.banner.activo === 1)?'Si':'No'}</td>
        <td>
          <button className="btn btn-outline-danger mx-1" onClick={()=>this.props.delete(this.props.banner.idBanner)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <Link className="btn btn-outline-warning mx-1" to={`/banners/editar/${this.props.banner.idBanner}`}>
            <i className="fas fa-pen"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

class BannerList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">Descripción</th>
                      <th scope="col">Activo</th>
                      <th scope="col">
                        <Link to="/banners/agregar" className="btn btn-outline-success">Agregar banner</Link>
                      </th>
                    </tr>
                </thead>
            <tbody>
            {this.props.banners.map(banner => {
                return (
                    <BannerListItem key={banner.idBanner} banner={banner} delete={this.props.delete} />
                );
            })}
            </tbody>
            </table>
        </div>
    );
  }
}

export default BannerList;