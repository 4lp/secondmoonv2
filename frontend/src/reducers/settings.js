const initialState = {
	isLoading: true,
	settings: null 
}

export default function settings(state=initialState, action) {

	switch (action.type) {
		case 'SETTINGS_LOADING':
			return {...state, isLoading: true}

		case 'FETCH_SETTINGS':
		    return {...state, settings: action.settings, isLoading: false};

		default:
			return state;
	}
}
