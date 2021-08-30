import moment from 'moment';
import React, { useState,useEffect,useContext } from 'react'
import Swal from 'sweetalert2';
import config from '../../config/config';
import ModalBuscarProducto from '../ModalBuscarProducto';
import { OfertasContext } from '../../context/ofertas/ofertasContext';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader';
import ProductosOferta from './ProductosOferta';

const FormOferta = () => {
    const {loading:loadingContext,error:errorContext,oferta,agregarOferta,modificarOferta,agregarProducto,traerOfertaPorId,eliminarProducto} = useContext(OfertasContext);
    const [formValues, setFormValues] = useState({
        titulo:'',
        descripcion:'',
        validoHasta:moment(new Date()).format('YYYY-MM-DD'),
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
        if(oferta){
            setFormValues({
                descripcion:oferta.descripcion,
                validoHasta:moment(oferta.validoHasta).format('YYYY-MM-DD'),
                titulo:oferta.titulo,
                activo:oferta.activo
            });
            setProductos(oferta.productos);
        }
    }, [])
    
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
    }

    const handleSubmitProductos = async (e)=>{
        e.preventDefault();
        if(formValuesProductos.idProducto==="" || formValuesProductos.idSubProducto===""){
            Swal.fire('Atención','Quedan campos por completar','warning');
            return;
        }
        if(oferta){
            await agregarProducto(formValuesProductos,oferta.id);
            if(errorContext){
                Swal.fire('Atención',errorContext,'error');
                return;
            }
            Swal.fire('Listo','El producto se agregó a la oferta','success').then(()=>{
                setFormValuesProductos({
                    idProducto:'',
                    idSubProducto:'',
                    producto:''
                });
                traerOfertaPorId(oferta.id);
            });
        }else{
            setProductos([...productos,formValuesProductos]);
        }
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
        data.append('titulo',formValues.titulo);
        data.append('activo',formValues.activo);
        data.append('foto',document.getElementById('foto').files[0] ? document.getElementById('foto').files[0] : null);
        if(!oferta){
            data.append('productos',JSON.stringify(productos))
            await agregarOferta(data);
        }else{
            await modificarOferta(data,oferta.id);
        }
        if(!errorContext){
            Swal.fire('Listo','Oferta guardada con éxito','success').then(()=>{
                history.push('/ofertas');
            })
        }
    }

    const eliminarProductoDeOferta = id => {
        Swal.fire({
            title: '¿Seguro quieres eliminar el producto?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await eliminarProducto(id);
                Swal.fire(
                    'Eliminado',
                    'Recurso eliminado',
                    'success'
                ).then(()=>traerOfertaPorId(oferta.id));
            }
        });
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        <>
            <form className="form-group" onSubmit={handleSubmit} id="form-oferta">
                <div className="row">
                    <div className="col-12 col-md-6 my-3">
                        <input type="text" name="titulo" id="titulo" onChange={handleChange} className="form-control" placeholder="Titulo de la oferta" value={formValues.titulo}/>     
                    </div>
                    <div className="col-12 col-md-6 my-3">
                        <input type="date" name="validoHasta" id="validoHasta" onChange={handleChange} className="form-control" value={formValues.validoHasta}/>     
                    </div>
                    <div className="col-12 my-3">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea className="form-control" name="descripcion" id="descripcion" defaultValue={formValues.descripcion} onChange={handleChange} rows={7}>
                            
                        </textarea>
                    </div>
                    <div className="col-12 my-3">
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
                <ProductosOferta productos={productos} onDelete={eliminarProductoDeOferta}/>
            </div>
            <hr/>
            {loadingContext ? <Loader/> : <button type="button" className="btn btn-warning w-100" onClick={handleClickCarga}>Cargar Oferta</button> }
            {modalIsOpen ? <ModalBuscarProducto setProductoPadre={setProductoPadre}/> : null}
        </>
    );
}
 
export default FormOferta;