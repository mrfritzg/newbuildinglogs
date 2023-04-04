import { customAxios, customAxiosWithAuth } from './api'

export async function getAllRepairs() {
    const axios = customAxios()
    try {
        const response = await axios.get('/repairs')
        return response.data
    } catch(err) {
        console.log(err.message)
        return []
    }
}

export async function getRepair(id) {
    const axios = customAxios()
    try {
        const response = await axios.get(`/repairs/${id}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function deleteRepair(id) {
    console.log('deleteRepair' )
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/repairs/${id}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createRepairItem(repair) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post('/repairs', repair)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateRepair(id, repair) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/repairs/${id}`, repair)
    } catch(err) {
        console.log(err.message)
    }
}
