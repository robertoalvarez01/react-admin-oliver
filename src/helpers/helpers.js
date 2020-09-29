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

export const getData = async url=>{
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