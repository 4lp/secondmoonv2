function getCookie(name) ***REMOVED***
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') ***REMOVED***
	    var cookies = document.cookie.split(';');
	    for (var i = 0; i < cookies.length; i++) ***REMOVED***
		    var cookie = cookies[i].trim();
		    if (cookie.substring(0, name.length + 1) === (name + '=')) ***REMOVED***
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			***REMOVED***
		***REMOVED***
	***REMOVED***
	return cookieValue;
***REMOVED***

export const sendContactEmail = (name, reply, message, captcha) => ***REMOVED***
	return (dispatch, getState) => ***REMOVED***
		dispatch(***REMOVED***type: 'EMAIL_SENDING'***REMOVED***);

		let csrftoken = getCookie('csrftoken');
		
		let headers = ***REMOVED***"Content-Type": "application/json", "X-CSRFToken": csrftoken***REMOVED***;
		let body = JSON.stringify(***REMOVED***name, reply, message, captcha***REMOVED***);

		dispatch(***REMOVED***type: 'default', data: null ***REMOVED***);

		return fetch("/api/contact/", ***REMOVED***headers, body, method: "POST"***REMOVED***)
			.then(res => ***REMOVED***
				if (res.status < 500) ***REMOVED***
					return res.json().then(data => ***REMOVED***
						return ***REMOVED***status: res.status, data***REMOVED***;
					***REMOVED***)
				***REMOVED*** else ***REMOVED***
					console.log("Server Error!");
					throw res;
				***REMOVED***
			***REMOVED***)
			.then(res => ***REMOVED***
				if (res.status === 200) ***REMOVED***
					dispatch(***REMOVED***type: 'CONTACT_EMAIL_SENT', data: res.data ***REMOVED***);
					return res.data;
				***REMOVED*** else if (res.status === 403 || res.status === 401) ***REMOVED***
					dispatch(***REMOVED***type: "AUTHENTICATION_ERROR", data: res.data***REMOVED***);
					throw res.data;
				***REMOVED*** else if (res.status === 400) ***REMOVED***
					dispatch(***REMOVED***type: "BAD_REQUEST", data: res.data***REMOVED***);
					throw res.data;
				***REMOVED*** else ***REMOVED***
					dispatch(***REMOVED***type: "SERVER_ERROR", data: res.data***REMOVED***);
				  	throw res.data;
				***REMOVED***
			***REMOVED***)
	***REMOVED***
***REMOVED***
