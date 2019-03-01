const initialState = ***REMOVED***
	isLoading: true,
	images: null 
***REMOVED***

export default function carouselImages(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'CAROUSELIMAGES_LOADING':
			return ***REMOVED***...state, isLoading: true***REMOVED***

		case 'FETCH_CAROUSELIMAGES':
		    return ***REMOVED***...state, images: action.images, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
