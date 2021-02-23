export const authentication = ()=>{
    const adminUser = JSON.parse(localStorage.getItem('administrador'));
    if (adminUser === null) {
        return window.location.assign('/ingresar');
    }
    return adminUser;
}

export const requestDelete = async url=>{
    try {
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(url, requestOptions).then(response => response.json()).then(data=>data);
        return response;
    } catch (error) {
        return error;
    }
}

export const request = (url,method,body=null)=>{
    return new Promise(async(resolve,reject)=>{
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);
        myHeaders.append("Content-Type","application/json");
        let requestOptions = {
            method,
            headers: myHeaders,
            redirect: 'follow',
            body
        };
        const req = await fetch(url, requestOptions);
        if(req.status===200){
            const dataReq = await req.json();
            return resolve(dataReq);
        }
        return reject('Problemas en el servidor');
    })
}

export const getData = async (url)=>{
    try {
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        const data = await fetch(url, requestOptions).then(response => response.json()).then(result => {
            return result;
        });
        return data;
    } catch (error) {
        return error;
    }
}

export const requestPut = async url=>{
    try {
        const administrador = JSON.parse(localStorage.getItem('administrador'));
        let myHeaders = new Headers();
        myHeaders.append("token", administrador.token);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        const data = await fetch(url, requestOptions).then(response => response.json()).then(result => {
            return result;
        });
        return data;
    } catch (error) {
        return error;
    }
}