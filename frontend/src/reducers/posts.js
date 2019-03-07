const initialState = ***REMOVED***
	isLoading: true,
	posts: [] 
***REMOVED***

export default function posts(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'POSTS_LOADING':
			return ***REMOVED***...state, posts: [...state.posts], isLoading: true***REMOVED***

		case 'CLEAR_POSTS':
			return ***REMOVED***...state, posts: [], isLoading: true***REMOVED***

		case 'FETCH_POSTS':
		    return ***REMOVED***...state, posts: [...state.posts,action.posts.results], next:action.posts.next, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
