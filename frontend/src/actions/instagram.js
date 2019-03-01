import Instagram from 'node-instagram';

export const fetchInstagram = () => {
	return (dispatch, getState) => {
		const instagram = new Instagram({
		  clientId: 'dc5b439fcb7e4e63afc51d5bf7f6e3e3',
		  //clientSecret: 'your-client-secret',
		  accessToken: '7319332388.1677ed0.502bab43ca9f4c89853babd698491324',
		});
		
		console.log(instagram.request)

		instagram.get('users/self/media/recent', (err, data) => {
		  if (err) {
			dispatch({type: "INSTAGRAM_ERROR", errors: err});
			throw err;
		  } else {
			return dispatch({type: 'FETCH_INSTAGRAM', pictures: data});
		  }
		});
	}
}
