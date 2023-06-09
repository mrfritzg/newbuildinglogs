import { customAxiosWithAuth } from './api'

export async function deleteCommentFromPost(commentId, postId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/comments/p/${postId}/c/${commentId}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createCommentForPost(comment, postId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post(`/comments/p/${postId}`, comment)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function getCommentFromPost(commentId, postId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/comments/p/${postId}/c/${commentId}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateCommentOfIdFromPost(comment, commentId, postId) {
    console.log('updateCommentOfIdFromPost')
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/comments/p/${postId}/c/${commentId}`, comment)
    } catch(err) {
        console.log(err.message)
    }
}

/////////////////////////

export async function deleteCommentFromRepair(commentId, repairId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/comments/r/${repairId}/c/${commentId}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createCommentForRepair(comment, repairId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post(`/comments/r/${repairId}`, comment)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function getCommentFromRepair(commentId, repairId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/comments/r/${repairId}/c/${commentId}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateCommentOfIdFromrepair(comment, commentId, repairId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/comments/r/${repairId}/c/${commentId}`, comment)
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateCommentsfromEdit(comment, commentId) {
    // console.log('updateCommentsfromEdit')
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/comments/c/${commentId}`, comment)
    } catch(err) {
        console.log(err.message)
    }
}