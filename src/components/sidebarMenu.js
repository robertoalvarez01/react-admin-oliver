import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu.json';

const SideBarMenu = () => {
    return (
        <div className="menu-lateral">
            {Menu.map(item=>(
                // <div key={item.id} className="col-12 col-sm-6 col-md-4 my-3">
                //     <div className="card">
                //         <div className="card-header">
                //             {item.titulo}
                //         </div>
                //         <div className="card-body">
                //             <p className="card-text">{item.subtitulo}</p>
                //             <Link to={item.url} className="btn btn-warning btn-block">{item.boton}</Link>
                //         </div>
                //     </div>
                // </div>
                <div className="my-2 py-2">
                    <Link to={item.url}>
                        <i className="fas fa-sign-out-alt"/> {item.titulo}
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default SideBarMenu;