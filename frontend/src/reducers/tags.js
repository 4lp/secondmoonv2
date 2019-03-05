const initialState = ***REMOVED***
	isLoading: true,
	tags: null 
***REMOVED***

export default function tags(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'TAGS_LOADING':
			return ***REMOVED***...state, isLoading: true***REMOVED***

		case 'FETCH_TAGS':
		    return ***REMOVED***...state, tags: action.tags, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
