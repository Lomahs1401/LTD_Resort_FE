const initState = {
    favouritesRooms: localStorage.getItem('favourites_rooms') == null 
        ? [] 
        : JSON.parse(localStorage.getItem('favourites_rooms')),
    favouritesServices: localStorage.getItem('favourites_services') == null 
        ? [] 
        : JSON.parse(localStorage.getItem('favourites_services')),
    avatar: localStorage.getItem('avatar') == null 
        ? '' 
        : JSON.parse(localStorage.getItem('avatar')),
    bookmarkRooms: localStorage.getItem('bookmark_rooms') == null
        ? []
        : JSON.parse(localStorage.getItem('bookmark_rooms')),
}

const rootReducer = (state = initState, action) => {
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
        
            return {
                ...state,
                favouritesServices: newFavouriteServices,
            };
        case 'avatar/addAvatar':
            localStorage.setItem('avatar', JSON.stringify(action.payload));

            return {
                ...state,
                avatar: action.payload,
            }
        case 'avatar/removeAvatar':
            localStorage.setItem('avatar', JSON.stringify(''));

            return {
                ...state,
                avatar: action.payload,
            }
        case 'room/bookmarkRoom':
            localStorage.setItem('bookmark_rooms', JSON.stringify([
                ...state.bookmarkRooms,
                action.payload,
            ]))
            return {
                ...state,
                bookmarkRooms: [
                    ...state.bookmarkRooms,
                    action.payload,
                ]    
            }
        case 'room/unmarkRoom':
            const newBookmarkRooms = state.bookmarkRooms.filter((bookmarkRoom) => {
                return bookmarkRoom.id !== action.payload;
            });
            
            localStorage.setItem('bookmark_rooms', JSON.stringify(newBookmarkRooms));
            
            return {
                ...state,
                bookmarkRooms: newBookmarkRooms,
            };
        default:
            return state;
    }
}

export default rootReducer;