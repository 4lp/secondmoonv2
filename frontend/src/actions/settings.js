function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
	    var cookies = document.cookie.split(';');
	    for (var i = 0; i < cookies.length; i++) {
		    var cookie = cookies[i].trim();
		    if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

export const fetchSettings = () => {
	return (dispatch, getState) => {
		let csrftoken = getCookie('csrftoken');
		
		let headers = {"Content-Type": "application/json", "X-CSRFToken": csrftoken};

		return fetch("/api/global/", {headers, })
			.then(res => {
				if (res.status < 499) {
					return res.json().then(data => {
						return {status: res.status, data};
					})
				} else {
					console.log("Server Error!");
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					return dispatch({type: 'FETCH_SETTINGS', settings: res.data});
				} else if (res.status === 401 || res.status === 403) {
					dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
	  				throw res.data;
				}
			})
	}
}

