import Instagram from 'node-instagram';

export const fetchInstagram = () => ***REMOVED***
	return (dispatch, getState) => ***REMOVED***
		const instagram = new Instagram(***REMOVED***
		  clientId: 'dc5b439fcb7e4e63afc51d5bf7f6e3e3',
		  //clientSecret: 'your-client-secret',
		  accessToken: '7319332388.1677ed0.502bab43ca9f4c89853babd698491324',
		***REMOVED***);
		
		console.log(instagram.request)

		instagram.get('users/self/media/recent', (err, data) => ***REMOVED***
		  if (err) ***REMOVED***
			dispatch(***REMOVED***type: "INSTAGRAM_ERROR", errors: err***REMOVED***);
			throw err;
		  ***REMOVED*** else ***REMOVED***
			return dispatch(***REMOVED***type: 'FETCH_INSTAGRAM', pictures: data***REMOVED***);
		  ***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***
