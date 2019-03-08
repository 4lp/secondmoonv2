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

export const sendContactEmail = (name, reply, message, captcha) => {
	return (dispatch, getState) => {
		dispatch({type: 'EMAIL_SENDING'});

		let csrftoken = getCookie('csrftoken');
		
		let headers = {"Content-Type": "application/json", "X-CSRFToken": csrftoken};
		let body = JSON.stringify({name, reply, message, captcha});

		dispatch({type: 'default', data: null });

		return fetch("/api/contact/", {headers, body, method: "POST"})
			.then(res => {
				if (res.status < 500) {
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
					dispatch({type: 'CONTACT_EMAIL_SENT', data: res.data });
					return res.data;
				} else if (res.status === 403 || res.status === 401) {
					dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
					throw res.data;
				} else if (res.status === 400) {
					dispatch({type: "BAD_REQUEST", data: res.data});
					throw res.data;
				} else {
					dispatch({type: "SERVER_ERROR", data: res.data});
				  	throw res.data;
				}
			})
	}
}
