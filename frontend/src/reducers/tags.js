const initialState = {
	isLoading: true,
	tags: null 
}

export default function tags(state=initialState, action) {

	switch (action.type) {
		case 'TAGS_LOADING':
			return {...state, isLoading: true}

		case 'FETCH_TAGS':
		    return {...state, tags: action.tags, isLoading: false};

		default:
			return state;
	}
}
