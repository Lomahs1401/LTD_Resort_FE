import { message } from "antd"

export const addFavouriteRoom = (data) => {
    message.success('Add to list favourites room successful!');
    
    return {
        type: 'favourites/addFavouriteRoom',
        payload: data
    }
}

export const addFavouriteService = (data) => {
    message.success('Add to list favourites service successful!');
    
    return {
        type: 'favourites/addFavouriteService',
        payload: data
    }
}