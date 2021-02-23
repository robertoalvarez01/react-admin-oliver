import React from 'react';
import './style/EnvioList.css';

class EnvioListItem extends React.Component {
  render() {
    return (
      <>
        <tr className={(this.props.envio.venta.pagado)?'nopago':'pago'}>
          {/* <th style={{verticalAlign:'baseline'}}>
            <span className="span-pagado" style={{display:'block',width:'10px',height:'10px',backgroundColor:'#439443',borderRadius:'5px'}}></span>
          </th> */}
          <th>{this.props.envio.zona || '-'}</th>
          <td>{this.props.envio.tipo}</td>
          <td className="buttonsDesktop">
            <button className="btn btn-danger mx-1" onClick={()=>this.props.delete(this.props.envio.idEnvio)}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-warning mx-1" onClick={()=>this.props.mostrarDetalle(this.props.envio.venta)}>
              <i className="fas fa-eye"></i>
            </button>
            {(this.props.envio.idZona)?
            <>
              <button className={`btn btn-${(this.props.envio.entregado===0)?`info`:`success`} mx-1`} disabled={(this.props.envio.en_camino===0 || this.props.envio.entregado===1)?true:false} onClick={()=>this.props.cambiarEstadoEntregado(this.props.envio.idEnvio)}>
                {(this.props.envio.entregado===0)?`E`:`R`}
              </button>
              <button className={`btn btn-${(this.props.envio.en_camino===0)?`info`:`danger`} mx-1`} disabled={(this.props.envio.en_camino===0)?false:true} onClick={()=>this.props.cambiarEstadoEnCamino(this.props.envio.idEnvio)}>
                <i className="fas fa-ambulance"></i>
              </button>
            </>:
              <button className="btn btn-success mx-1">Entregar</button>
            }
          </td>
        </tr>
      </>
    );
  }
}

class EnvioList extends React.Component {
  render() {
    return (
        <div className="container mt-3">
            <table className="table text-center table-envios">
                <thead className="thead-dark">
                    <tr>
                      <th scope="col">Zona</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">
                      </th>
                    </tr>
                </thead>
              <tbody>
              {this.props.envios.map((envio,key) => {
                  return (
                    <EnvioListItem delete={this.props.delete} key={key} envio={envio} mostrarDetalle={this.props.mostrarDetalle} cambiarEstadoEntregado={this.props.cambiarEstadoEntregado} cambiarEstadoEnCamino={this.props.cambiarEstadoEnCamino} />
                  );
              })}
              </tbody>
            </table>
        </div>
    );
  }
}

export default EnvioList;