import { message } from "antd"
import { toast } from "react-toastify"

export const addFavouriteRoom = (data) => {
    toast.success('Add to list favourites room successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    
    return {
        type: 'favourites/addFavouriteRoom',
        payload: data,
    }
}

export const addFavouriteService = (data) => {
    toast.success('Add to list favourites service successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    
    return {
        type: 'favourites/addFavouriteService',
        payload: data,
    }
}

export const removeFavouriteRoom = (data) => {
    toast.success('Remove favorite room from favorite list successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })

    return {
        type: 'favourites/removeFavouriteRoom',
        payload: data,
    }
}

export const removeFavouriteService = (data) => {
    toast.success('Remove favorite service from favorite list successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })

    return {
        type: 'favourites/removeFavouriteService',
        payload: data,
    }
}

export const addAvatar = (data) => {
    return {
        type: 'avatar/addAvatar',
        payload: data
    }
}

export const removeAvatar = (data) => {
    return {
        type: 'avatar/removeAvatar',
        payload: data
    }
}