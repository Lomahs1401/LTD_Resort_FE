import { message } from "antd"

export const addFavouriteRoom = (data) => {
    message.success('Add to list favourites room successfully!');
    
    return {
        type: 'favourites/addFavouriteRoom',
        payload: data,
    }
}

export const addFavouriteService = (data) => {
    message.success('Add to list favourites service successfully!');
    
    return {
        type: 'favourites/addFavouriteService',
        payload: data,
    }
}

export const removeFavouriteRoom = (data) => {
    message.success('Remove favorite room from favorite list successfully!');

    return {
        type: 'favourites/removeFavouriteRoom',
        payload: data,
    }
}

export const removeFavouriteService = (data) => {
    message.success('Remove favorite service from favorite list successfully!');

    return {
        type: 'favourites/removeFavouriteService',
        payload: data,
    }
}