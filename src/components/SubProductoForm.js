import React, { useState } from 'react';
import ModalBuscarProducto from './ModalBuscarProducto';
const SubProductoForm = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = ()=>setModalIsOpen(false);
  
  const setProductoPadre = id=>{
    document.getElementById('selectIdProductoPadre').value = id;
    return closeModal();
  }

  const habilitarInputfile=event=>{
    document.getElementById('input-file-subproducto').classList.toggle('d-none');
  }
  
  let claseContainerForm = (props.formId==='formModificarSubProducto')?'col-12 col-md-9':'col-12';
  return (
      <div className="container bg-light border rounded p-4"> 
        <form onSubmit={props.onSubmit} id={props.formId}>
          <div className="row">
            <div className={claseContainerForm}>
              <div className="row">
                <div className="form-group col-12 col-md-6">
                  <label>Nombre del subproducto: (obligatorio)</label>
                  <input
                    defaultValue={props.formValues.subProducto}
                    required
                    className="form-control"
                    type="text"
                    name="subProducto"/>
                </div>

                <div className="form-group col-12 col-md-6">
                  <label>Código de barra:</label>
                  <input
                    defaultValue={props.formValues.codigoBarra}
                    required
                    className="form-control"
                    type="text"
                    name="codigoBarra"
                  />
                </div>

                <div className="form-group col-12">
                  <div className="d-flex justify-content-between mb-2">
                    <label>Producto padre:</label>
                    <button type="button" className="btn btn-outline-success" onClick={()=>setModalIsOpen(true)}>Buscar</button>
                  </div>
                  <select required className="form-control" name="idProducto" id="selectIdProductoPadre" defaultValue={props.formValues.idProducto}>
                    <option value="">-- Seleccione el producto de referencia --</option>
                    {props.productos.map(prd=>(
                      <option value={prd.idProducto} key={prd.idProducto}>{prd.producto} | {prd.marca} | {prd.categoria}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-12 col-md-4">
                  <label>Stock</label>
                  <input
                    defaultValue={props.formValues.stock}
                    required
                    className="form-control"
                    type="number"
                    step="any"
                    name="stock"/>
                </div>

                <div className="form-group col-12 col-md-4">
                  <label>Minimo de Stock</label>
                  <input
                    defaultValue={props.formValues.minStock}
                    required
                    className="form-control"
                    type="number"
                    step="any"
                    name="minStock"/>
                </div>

                <div className="form-group col-12 col-md-4">
                  <label>Peso en Kg</label>
                  <input
                    defaultValue={props.formValues.peso}
                    className="form-control"
                    type="number"
                    step="any"
                    name="peso"/>
                </div>

                <div className="form-group col-12 col-md-4">
                  <label>Tamaño:</label>
                  <select required className="form-control" name="idTamaño" onChange={props.onChange} defaultValue={props.formValues.tamaño}>
                    {props.tamaños.map(tm=>(
                      <option value={tm.idTamaño} key={tm.idTamaño}>{tm.tamaño}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-12 col-md-4">
                  <label>Precio unidad</label>
                  <input
                    defaultValue={props.formValues.precioUnidad}
                    className="form-control"
                    type="number"
                    step="any"
                    name="precioUnidad"/>
                </div>
                {(props.formId === 'formModificarSubProducto')?
                  <div className="form-group col-12 col-md-4">
                    <input type="checkbox" onChange={habilitarInputfile}/> Modificar imágen de producto
                    <input type="file" id="input-file-subproducto" name="foto" className="form-control d-none"/>
                  </div>
                :
                  <div className="form-group col-12 col-md-4">
                    <label>Imagen del producto:</label>
                    <input type="file" name="foto" className="form-control" required/>
                  </div>
                }
              </div>
            </div>
            {props.formId === 'formModificarSubProducto'?
            <div className="col-12 col-md-3 text-right">
              <img src={`http://localhost:3001/img/${props.formValues.foto}`} className="img-fluid" alt={props.formValues.subProducto} style={{'height':"350px"}}/> 
            </div>:null}
            <button type="submit" className="btn btn-outline-success btn-block">
              Guardar
            </button>
          </div>
        </form>
        {(modalIsOpen)?<ModalBuscarProducto productos={props.productos} 
                                            closeModal={closeModal} 
                                            setProductoPadre={setProductoPadre}/>:null}
      </div>
  );
}
 
export default SubProductoForm;