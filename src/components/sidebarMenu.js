import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu.json';
import { UsuarioContext } from "../context/usuario/usuarioContext";
import Swal from 'sweetalert2';

const SideBarMenu = ({show}) => {
    const {logueado,logout} = useContext(UsuarioContext);

    const cerrarSesion =  () => {
        Swal.fire({
          title: '¿Seguro quieres abandonar la sesión?',
          text: "Tendrás que reingresar tus credenciales otra vez",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then(async(result) => {
          if (result.isConfirmed) {
            logout();
            window.location.assign('/ingresar');
          }
        });
    }

    return (
        <div className={`menu-lateral ${show ? 'show' : ''}`}>
            {Menu.map(item=>(
                <div className="my-2 py-2" key={item.id}>
                    <Link to={item.url}>
                        <i className="fas fa-sign-out-alt"/> {item.titulo}
                    </Link>
                </div>
            ))}
            {logueado ? 
            <div className="my-2 py-2 d-block d-md-none" style={{color:'white'}} onClick={cerrarSesion}>
                <span>
                    <i className="fas fa-sign-out-alt"/> Salir
                </span>
            </div>
            :
                null
            }
        </div>
    );
}
 
export default SideBarMenu;