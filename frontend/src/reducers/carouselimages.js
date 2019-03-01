const initialState = {
	isLoading: true,
	images: null 
}

export default function carouselImages(state=initialState, action) {

	switch (action.type) {
		case 'CAROUSELIMAGES_LOADING':
			return {...state, isLoading: true}

		case 'FETCH_CAROUSELIMAGES':
		    return {...state, images: action.images, isLoading: false};

		default:
			return state;
	}
}
