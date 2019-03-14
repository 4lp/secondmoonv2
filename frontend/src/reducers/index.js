import { combineReducers } from 'redux';
import posts from "./posts";
import tags from "./tags";
import email from "./email";
import settings from "./settings";

const gaiasApp = combineReducers({
	email, posts, settings, tags
})

const rootReducer = (state, action) => {

	if ( action.type === 'AUTHENTICATION_ERROR' || action.type === 'LOGOUT_SUCCESSFUL' ) {
		state = undefined;
	}
	return gaiasApp(state, action);
}

export default rootReducer;
