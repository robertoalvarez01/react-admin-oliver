import React, { useState, useContext, useEffect } from 'react';
import { MarcasContext } from '../../context/marcas/marcasContext';
import Loader from '../Loader';

const FormAumentoPorMarca = () => {
    const {data:marcas,loading,error:errorState,traerTodas,aplicarAumento} = useContext(MarcasContext);
    const [formValues, setFormValues] = useState({
        idMarca:'',
        aumento:''
    });
    const [error, setError] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);

    useEffect(() => {
        traerTodas();
    }, [])

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let validation = validar();
        if(typeof validation == 'object'){
            if(validation.key){
                setError(`Completa el campo ${validation.key}`)
            }else{
                setError(validation.msg)
            }
            return false;
        }
        setError(false);
        await aplicarAumento(formValues);
        setActionSuccess('Se han aplicado los aumentos correspondientes');
    }
    
    const validar = () => {
        for (const key in formValues) {
            if (Object.hasOwnProperty.call(formValues, key)) {
                const element = formValues[key];
                if(element == ''){
                    return {
                        ok:false,
                        key
                    };
                }
            }
        }
        if(isNaN(parseInt(formValues.aumento))){
            return {
                ok:false,
                msg:'No es posible aumentar con ese formato'
            };
        }
        return true;
    }

    return (
        marcas.length == 0 || loading ? <Loader/> :
        <form className="form-group" onSubmit={handleSubmit}>
            <h2>Aumento por Marca</h2>
            {error ? <div className="alert alert-danger text-center">{error}</div> : null}
            {actionSuccess ? <div className="alert alert-success text-center">{actionSuccess}</div> : null}
            <hr/>
            <div className="row">
                <div className="col-12 col-md-5 my-2">
                    <select className="form-control" name="idMarca" defaultValue={formValues.idMarca} onChange={handleChange}>
                        <option value="">Seleccione una marca</option>
                        {marcas.map(mk=>(
                            <option value={mk.idMarca} key={mk.idMarca}>{mk.marca}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-5 my-2">
                    <input type="text" name="aumento" className="form-control" placeholder="Porcentaje de aumento" value={formValues.aumento} onChange={handleChange}/>
                </div>
                <div className="col-12 col-md-2 my-2">
                    <input type="submit" value="Aplicar" className="btn btn-info btn-block"/>
                </div>
            </div>
        </form>
    );
}
 
export default FormAumentoPorMarca;