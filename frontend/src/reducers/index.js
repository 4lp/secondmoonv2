import { combineReducers } from 'redux';
import blogposts from "./blogposts";
import blogcategories from "./blogcategories";
import posts from "./posts";
import email from "./email";
import settings from "./settings";
import instagram from "./instagram"

const gaiasApp = combineReducers({
	blogposts, email, posts, settings, blogcategories, instagram
})

const rootReducer = (state, action) => {

	if ( action.type === 'AUTHENTICATION_ERROR' || action.type === 'LOGOUT_SUCCESSFUL' ) {
		state = undefined;
	}
	return gaiasApp(state, action);
}

export default rootReducer;
