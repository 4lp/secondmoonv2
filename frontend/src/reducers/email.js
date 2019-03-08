const initialState = ***REMOVED***
	errors: ***REMOVED******REMOVED***,
	user_message: null,
	isSending: false
***REMOVED***;

export default function auth(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***

		case 'CONTACT_EMAIL_SENT':
			return ***REMOVED***...state, user_message: "Message sent.", errors:***REMOVED******REMOVED***, isSending: false***REMOVED***;

		case 'SERVER_ERROR':
			return ***REMOVED***...state, user_message: null, errors: ***REMOVED***server_error: "Something went wrong. Please refresh this page and try again."***REMOVED***, isSending: false***REMOVED***

		case 'EMAIL_SENDING':
			return ***REMOVED***...state, errors: ***REMOVED******REMOVED***, user_message: null, isSending: true***REMOVED***

		case 'BAD_REQUEST':
			return ***REMOVED***...state, user_message: null, errors: action.data, isSending: false***REMOVED***

		default:
			return state
			
	***REMOVED***
***REMOVED***
