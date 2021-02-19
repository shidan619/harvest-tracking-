const create = (harvest,credentials) => {
    return fetch('/api/harvest/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(harvest)
    })
        .then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
}

const list = (credentials) => {
    return fetch('/api/harvest/', {
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+credentials.t
        }
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
    return fetch('/api/harvest/' + params.harvestID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}
//todo harvest id error
const update = (params, credentials, harvest) => {
    return fetch('/api/harvest/' + params.harvestID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(harvest)
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}

const remove = (params, credentials) => {
    return fetch('/api/harvest/' + params.harvestID, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}

export { create, list, read, update, remove }