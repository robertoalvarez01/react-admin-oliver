import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu.json';

const SideBarMenu = () => {
    return (
        <div className="menu-lateral">
            {Menu.map(item=>(
                <div className="my-2 py-2" key={item.id}>
                    <Link to={item.url}>
                        <i className="fas fa-sign-out-alt"/> {item.titulo}
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default SideBarMenu;