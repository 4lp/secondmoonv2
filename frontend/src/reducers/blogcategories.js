const initialState = [];


export default function blogposts(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'FETCH_BLOGCATEGORY':
		    return [...state, ...action.blogcategories];

		default:
			return state;
	***REMOVED***
***REMOVED***
