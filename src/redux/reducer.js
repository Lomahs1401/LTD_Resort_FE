const initState = {
    favouritesRooms: localStorage.getItem('favourites_rooms') == null 
        ? [] 
        : JSON.parse(localStorage.getItem('favourites_rooms')),
    favouritesServices: localStorage.getItem('favourites_services') == null 
        ? [] 
        : JSON.parse(localStorage.getItem('favourites_services')),
}

const rootReducer = (state = initState, action) => {
    console.log({ state, action });

    switch (action.type) {
        case 'favourites/addFavouriteRoom':
            localStorage.setItem('favourites_rooms', JSON.stringify(
                [
                    ...state.favouritesRooms,
                    action.payload,
                ]
            ))
            return {
                ...state,
                favouritesRooms: [
                    ...state.favouritesRooms,
                    action.payload,
                ]
            }
        case 'favourites/addFavouriteService':
            localStorage.setItem('favourites_services', JSON.stringify(
                [
                    ...state.favouritesServices,
                    action.payload,
                ]
            ))
            return {
                ...state,
                favouritesServices: [
                    ...state.favouritesServices,
                    action.payload,
                ]
            }
        case 'favourites/removeFavouriteRoom':
            const newFavouriteRooms = state.favouritesRooms.filter((favouriteRoom) => {
                return favouriteRoom.id !== action.payload;
            });
            
            localStorage.setItem('favourites_rooms', JSON.stringify(newFavouriteRooms));
            
            return {
                ...state,
                favouritesRooms: newFavouriteRooms,
            };
        case 'favourites/removeFavouriteService':
            const newFavouriteServices = state.favouritesServices.filter((favouriteService) => {
                return favouriteService.id !== action.payload;
            });
        
            localStorage.setItem('favourites_services', JSON.stringify(newFavouriteServices));
            console.log('New Favourites Services: ', newFavouriteServices)
        
            return {
                ...state,
                favouritesServices: newFavouriteServices,
            };
        default:
            return state;
    }
}

export default rootReducer;