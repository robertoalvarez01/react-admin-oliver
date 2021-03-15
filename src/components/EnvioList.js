import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import EnvioListExcel from './EnvioListExcel';
import './style/EnvioList.css';

class EnvioListItem extends React.Component {
  render() {
    return (
      <>
        <tr className={(this.props.envio.venta.pagado === 0)?'nopago':'pago'}>
          {/* <th style={{verticalAlign:'baseline'}}>
            <span className="span-pagado" style={{display:'block',width:'10px',height:'10px',backgroundColor:'#439443',borderRadius:'5px'}}></span>
          </th> */}
          <th>{this.props.envio.zona || '-'}</th>
          <td>{this.props.envio.tipo}</td>
          <td className="buttonsDesktop">
            <button className="btn btn-warning mx-1" onClick={()=>this.props.mostrarDetalle(this.props.envio.venta)}>
              <i className="fas fa-eye"></i>
            </button>
            {(this.props.envio.tipo != 'Local')?
            <>
              <button className={`btn btn-${(this.props.envio.entregado===0)?`info`:`success`} mx-1`} disabled={(this.props.envio.en_camino===0 || this.props.envio.entregado===1)?true:false} onClick={()=>this.props.cambiarEstadoEntregado(this.props.envio.idEnvio)}>
                {(this.props.envio.entregado===0)?`E`:`R`}
              </button>
              <button className='btn btn-secondary mx-1' disabled={(this.props.envio.en_camino===0)?false:true} onClick={()=>this.props.cambiarEstadoEnCamino(this.props.envio.idEnvio)}>
                <i className="fas fa-ambulance"></i>
              </button>
            </>:
              <button className={`btn mx-1 btn-${(this.props.envio.venta.pagado===0)?'success':'danger'}`} onClick={()=>this.props.cambiarEstadoPagado(this.props.envio.venta.idVenta)}>{(this.props.envio.venta.entregado===0)?'Entregar':'Desentregar'}</button>
            }
            <span style={{float:'right'}}>{this.props.temporizador}</span>
          </td>
        </tr>
      </>
    );
  }
}

class EnvioList extends React.Component {

  calcularTiempo(time){
    let horarioVenta = new Date(time.split('.')[0]);
    let horarioActual = new Date();

    let minutos = Math.floor((horarioActual - horarioVenta)/1000/60);
    let horas = Math.floor(minutos/60);
    let dias = Math.floor(horas/24);
    if(dias>0){
      if(dias===1) return 'Hace 1 día';
      return `Hace ${dias} días`;
    }
    switch (horas) {
      case 0:
        return `Hace ${minutos} min.`;
      case 1:
        return 'Hace 1 Hora';
      default:
        return `Hace ${horas} horas`;
    }
  }

  render() {
  
  
    return (
      <div className="container mt-3">
        <EnvioListExcel data={this.props.envios}/>
        <table className="table text-center table-envios">
            <thead className="thead-dark">
                <tr>
                  <th scope="col">Zona</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="btn btn-info"
                      table="table-envios-excel"
                      filename="envios"
                      sheet="tablexls"
                      buttonText="Exportar"/>
                  </th>
                </tr>
            </thead>
          <tbody>
          {this.props.envios.map((envio,key) => {
              let temporizador = this.calcularTiempo(envio.venta.fecha)
              return (
                <EnvioListItem key={key} envio={envio} mostrarDetalle={this.props.mostrarDetalle} cambiarEstadoEntregado={this.props.cambiarEstadoEntregado} cambiarEstadoEnCamino={this.props.cambiarEstadoEnCamino} cambiarEstadoPagado={this.props.cambiarEstadoPagado} temporizador={temporizador}/>
              );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EnvioList;