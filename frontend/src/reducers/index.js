import ***REMOVED*** combineReducers ***REMOVED*** from 'redux';
import posts from "./posts";
import tags from "./tags";
import email from "./email";
import settings from "./settings";

const gaiasApp = combineReducers(***REMOVED***
	email, posts, settings, tags
***REMOVED***)

const rootReducer = (state, action) => ***REMOVED***

	if ( action.type === 'AUTHENTICATION_ERROR' || action.type === 'LOGOUT_SUCCESSFUL' ) ***REMOVED***
		state = undefined;
	***REMOVED***
	return gaiasApp(state, action);
***REMOVED***

export default rootReducer;
