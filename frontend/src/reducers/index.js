import ***REMOVED*** combineReducers ***REMOVED*** from 'redux';
import blogposts from "./blogposts";
import blogcategories from "./blogcategories";
import products from "./products";
import email from "./email";
import settings from "./settings";
import carouselImages from "./carouselimages";
import instagram from "./instagram"

const gaiasApp = combineReducers(***REMOVED***
	blogposts, email, products, carouselImages, settings, blogcategories, instagram
***REMOVED***)

const rootReducer = (state, action) => ***REMOVED***

	if ( action.type === 'AUTHENTICATION_ERROR' || action.type === 'LOGOUT_SUCCESSFUL' ) ***REMOVED***
		state = undefined;
	***REMOVED***
	return gaiasApp(state, action);
***REMOVED***

export default rootReducer;
