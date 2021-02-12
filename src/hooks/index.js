import { useState,useEffect } from "react";

const useFetch = (url,method,defaultValue,body=null) => {
    const [data, setData] = useState(defaultValue);
    const [error, setError] = useState(null);

    useEffect(() => {
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);
        let requestOptions = {
            method,
            headers: myHeaders,
            redirect: 'follow',
            body
        };
        fetch(url,requestOptions).then(res=>res.json()).then(response=>{
            setData(response.data);
        }).catch(err=>{
            setError(err);
        })
    }, []);
    return {data,error}
}
 
export default useFetch;
