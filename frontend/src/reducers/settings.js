const initialState = ***REMOVED***
	isLoading: true,
	settings: null 
***REMOVED***

export default function settings(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'SETTINGS_LOADING':
			return ***REMOVED***...state, isLoading: true***REMOVED***

		case 'FETCH_SETTINGS':
		    return ***REMOVED***...state, settings: action.settings, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
