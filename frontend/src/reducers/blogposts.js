const initialState = ***REMOVED***
	isLoading: true,
	blogposts: null 
***REMOVED***

export default function blogposts(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'FETCH_BLOGPOSTS':
		    return ***REMOVED***...state, blogposts: action.blogposts, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
