function getCookie(name) ***REMOVED***
  var cookieValue = null;

  if (document.cookie && document.cookie != '') ***REMOVED***
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) ***REMOVED***
      var cookie = jQuery.trim(cookies[i]);

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) ***REMOVED***
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  return cookieValue;
***REMOVED***

function csrfSafeMethod(method) ***REMOVED***
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
***REMOVED***

function sameOrigin(url) ***REMOVED***
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  var host = document.location.host; // host + port
  var protocol = document.location.protocol;
  var sr_origin = '//' + host;
  var origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !(/^(\/\/|http:|https:).*/.test(url));
***REMOVED***

var csrftoken = getCookie(window.drf.csrfCookieName);

$.ajaxSetup(***REMOVED***
  beforeSend: function(xhr, settings) ***REMOVED***
    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) ***REMOVED***
      // Send the token to same-origin, relative URLs only.
      // Send the token only if the method warrants CSRF protection
      // Using the CSRFToken value acquired earlier
      xhr.setRequestHeader(window.drf.csrfHeaderName, csrftoken);
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
