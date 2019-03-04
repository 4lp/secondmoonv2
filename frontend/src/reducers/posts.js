const initialState = {
	isLoading: true,
	posts: null 
}

export default function posts(state=initialState, action) {

	switch (action.type) {
		case 'POSTS_LOADING':
			return {...state, isLoading: true}

		case 'FETCH_POSTS':
		    return {...state, posts: action.posts, isLoading: false};

		default:
			return state;
	}
}
