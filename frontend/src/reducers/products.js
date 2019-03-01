const initialState = ***REMOVED***
	isLoading: true,
	products: null 
***REMOVED***

export default function products(state=initialState, action) ***REMOVED***

	switch (action.type) ***REMOVED***
		case 'PRODUCTS_LOADING':
			return ***REMOVED***...state, isLoading: true***REMOVED***

		case 'FETCH_PRODUCTS':
		    return ***REMOVED***...state, products: action.products, isLoading: false***REMOVED***;

		default:
			return state;
	***REMOVED***
***REMOVED***
