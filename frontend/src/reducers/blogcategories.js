const initialState = [];


export default function blogposts(state=initialState, action) {

	switch (action.type) {
		case 'FETCH_BLOGCATEGORY':
		    return [...state, ...action.blogcategories];

		default:
			return state;
	}
}
