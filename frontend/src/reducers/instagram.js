const initialState = {
	isLoading: true,
	pictures: null,
	errors: null
}

export default function instagram(state=initialState, action) {

	switch (action.type) {
		case 'FETCH_INSTAGRAM':
		    return {...state, instagramPictures: action.pictures, errors: {}, isLoading: false};

		case 'INSTAGRAM_ERROR':
			console.log({...state, errors: action.errors, isLoading: false})
		    return {...state, errors: action.errors, isLoading: false};

		default:
			return state;
	}
}
