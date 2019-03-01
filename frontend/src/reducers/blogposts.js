const initialState = {
	isLoading: true,
	blogposts: null 
}

export default function blogposts(state=initialState, action) {

	switch (action.type) {
		case 'FETCH_BLOGPOSTS':
		    return {...state, blogposts: action.blogposts, isLoading: false};

		default:
			return state;
	}
}
