import moment from 'moment';
import React, { useState,useEffect,useContext } from 'react'
import Swal from 'sweetalert2';
import config from '../../config/config';
import ModalBuscarProducto from '../ModalBuscarProducto';
import { OfertasContext } from '../../context/ofertas/ofertasContext';
import { Redirect, useHistory } from 'react-router-dom';
import Loader from '../Loader';

const FormOferta = () => {
    const {loading:loadingContext,error:errorContext,agregarOferta} = useContext(OfertasContext);
    const [formValues, setFormValues] = useState({
        descripcion:'',
        validoHasta:moment(new Date()).format('YYYY-MM-DD'),
        precioFinal:'',
        activo:0
    });

    const [formValuesProductos, setFormValuesProductos] = useState({
        idProducto:'',
        idSubProducto:'',
        producto:''
    })

    //states para manejo de errores y carga
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [productos, setProductos] = useState([]);//state para guardar los productos de la oferta
    const [modalIsOpen, setModalIsOpen] = useState(false);//maneja modal para buscar productos

    const [subProductos, setSubProductos] = useState([])//state para guardar los subproductos del producto padre. Se usa para el select.

    const history = useHistory();
    
    useEffect(() => {
        if(loading){
            setLoading(false);
        }
    }, [subProductos])

    const handleChange = e =>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleChangeProductos = e =>{
        setFormValuesProductos({
            ...formValuesProductos,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        alert('!!');
    }

    const handleSubmitProductos = (e)=>{
        e.preventDefault();
        setProductos([
            ...productos,
            formValuesProductos
        ]);
        setFormValuesProductos({
            idProducto:'',
            idSubProducto:'',
            producto:''
        })
    }

    const setProductoPadre = (idProducto,productoName)=>{
        setModalIsOpen(false);
        setFormValuesProductos({
            ...formValuesProductos,
            idProducto:idProducto,
            producto:productoName
        });
        buscarSubProductos(idProducto);
    }

    const buscarSubProductos = async idProducto=>{
        try {
            setLoading(true);
            const res = await fetch(`${config.url}/productos/${idProducto}`);
            const data = await res.json();
            return setSubProductos(data.subproductos);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleClickCarga = async () => {
        const data = new FormData();
        data.append('descripcion',formValues.descripcion);
        data.append('validoHasta',formValues.validoHasta);
        data.append('precioFinal',formValues.precioFinal);
        data.append('activo',formValues.activo);
        data.append('foto',document.getElementById('foto').files[0]);
        data.append('productos',JSON.stringify(productos));
        await agregarOferta(data);
        if(!errorContext){
            Swal.fire('Listo','Oferta guardada con éxito','success').then(()=>{
                history.push('/ofertas');
            })
        }
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        <>
            <form className="form-group" onSubmit={handleSubmit} id="form-oferta">
                <div className="row">
                    <div className="col-12 col-md-6 my-3">
                        <input type="text" name="descripcion" id="descripcion" onChange={handleChange} className="form-control" placeholder="Descripción de la oferta" value={formValues.descripcion}/>     
                    </div>
                    <div className="col-12 col-md-6 my-3">
                        <input type="date" name="validoHasta" id="validoHasta" onChange={handleChange} className="form-control" value={formValues.validoHasta}/>     
                    </div>
                    <div className="col-12 col-md-6 my-3">
                        <input type="number" step="any" name="precioFinal" min="1" id="precioFinal" onChange={handleChange} className="form-control" placeholder="Precio final de la oferta" value={formValues.precioFinal}/>     
                    </div>
                    <div className="col-12 col-md-6 my-3">
                        <input type="file" name="foto" id="foto" onChange={handleChange} className="form-control"/>     
                    </div>
                    <input type="hidden" name="activo" value={formValues.activo}/>
                </div>
            </form>
            <h2 className="my-3">Agregar productos a la oferta</h2>
            <form className="form-group" onSubmit={handleSubmitProductos}>
                <div className="row">
                    <div className="col-12 col-md-5 my-3">
                        <input type="hidden" name="idProducto" id="idProducto" value={formValuesProductos.idProducto}/>
                        <button type="button" className="btn btn-success w-100" onClick={()=>setModalIsOpen(!modalIsOpen)}>Buscar producto padre</button> 
                        <span style={{backgroundColor:'gray',color:'white',borderRadius:'10px'}} className="d-block mt-2 text-center">{formValuesProductos.producto}</span>
                    </div>
                    <div className="col-12 col-md-5 my-3">
                        {loading ? 'Buscando subproductos...' : 
                        <select className="form-control" name="idSubProducto" id="idSubProducto" defaultValue={formValuesProductos.idSubProducto} onChange={handleChangeProductos}>
                            <option value="">Selecciona subproducto</option>
                            {subProductos.map(item=>(
                                <option value={item.idSubProducto} key={item.idSubProducto}>{item.subProducto}</option>
                            ))}
                        </select>    
                        }
                    </div>
                    <div className="col-12 col-md-2 my-3">
                        <button type="submit" className="btn btn-info w-100">Agregar</button>
                    </div>
                </div>
            </form>
            <h2 className="my-3">Productos de la oferta</h2>
            <div className="row">
                {productos.map((prd,key)=>(
                    <div className="col-12 col-md-4" key={key}>
                        <span style={{backgroundColor:'gray',color:'white',borderRadius:'10px'}} className="d-block mt-2 text-center">{prd.producto}</span>
                    </div>
                ))}
            </div>
            <hr/>
            {loadingContext ? <Loader/> : <button type="button" className="btn btn-warning w-100" onClick={handleClickCarga}>Cargar Oferta</button> }
            {modalIsOpen ? <ModalBuscarProducto setProductoPadre={setProductoPadre}/> : null}
        </>
    );
}
 
export default FormOferta;