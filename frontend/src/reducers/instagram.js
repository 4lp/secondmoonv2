const initialState = ***REMOVED***
	isLoading: true,
	pictures: null,
	errors: null
***REMOVED***

export default function instagram(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'FETCH_INSTAGRAM':
		    return ***REMOVED***...state, instagramPictures: action.pictures, errors: ***REMOVED******REMOVED***, isLoading: false***REMOVED***;

		case 'INSTAGRAM_ERROR':
			console.log(***REMOVED***...state, errors: action.errors, isLoading: false***REMOVED***)
		    return ***REMOVED***...state, errors: action.errors, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
