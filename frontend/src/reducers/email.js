const initialState = {
	errors: {},
	user_message: null,
	isSending: false
};

export default function auth(state=initialState, action) {

	switch (action.type) {

		case 'CONTACT_EMAIL_SENT':
			return {...state, user_message: "Message sent.", errors:{}, isSending: false};

		case 'SERVER_ERROR':
			return {...state, user_message: null, errors: {server_error: "Something went wrong. Please refresh this page and try again."}, isSending: false}

		case 'EMAIL_SENDING':
			return {...state, errors: {}, user_message: null, isSending: true}

		case 'BAD_REQUEST':
			return {...state, user_message: null, errors: action.data, isSending: false}

		default:
			return state
			
	}
}
