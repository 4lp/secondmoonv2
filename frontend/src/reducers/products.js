const initialState = {
	isLoading: true,
	products: null 
}

export default function products(state=initialState, action) {

	switch (action.type) {
		case 'PRODUCTS_LOADING':
			return {...state, isLoading: true}

		case 'FETCH_PRODUCTS':
		    return {...state, products: action.products, isLoading: false};

		default:
			return state;
	}
}
