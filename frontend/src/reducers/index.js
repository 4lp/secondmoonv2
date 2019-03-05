import ***REMOVED*** combineReducers ***REMOVED*** from 'redux';
import blogposts from "./blogposts";
import blogcategories from "./blogcategories";
import posts from "./posts";
import tags from "./tags";
import email from "./email";
import settings from "./settings";
import instagram from "./instagram"

const gaiasApp = combineReducers(***REMOVED***
	blogposts, email, posts, settings, blogcategories, instagram, tags
***REMOVED***)

const rootReducer = (state, action) => ***REMOVED***

	if ( action.type === 'AUTHENTICATION_ERROR' || action.type === 'LOGOUT_SUCCESSFUL' ) ***REMOVED***
		state = undefined;
	***REMOVED***
	return gaiasApp(state, action);
***REMOVED***

export default rootReducer;
