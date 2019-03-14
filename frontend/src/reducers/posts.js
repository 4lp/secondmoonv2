const initialState = {
	isLoading: true,
	posts: [] 
}

export default function posts(state=initialState, action) {

	switch (action.type) {
		case 'POSTS_LOADING':
			return {...state, posts: [...state.posts], isLoading: true}

		case 'CLEAR_POSTS':
			return {...state, posts: [], isLoading: true}

		case 'FETCH_POSTS':
		    return {...state, posts: [...state.posts,action.posts.results], next:action.posts.next, isLoading: false};

		default:
			return state;
	}
}
