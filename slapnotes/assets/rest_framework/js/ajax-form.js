function replaceDocument(docString) ***REMOVED***
  var doc = document.open("text/html");

  doc.write(docString);
  doc.close();
***REMOVED***

function doAjaxSubmit(e) ***REMOVED***
  var form = $(this);
  var btn = $(this.clk);
  var method = (
    btn.data('method') ||
    form.data('method') ||
    form.attr('method') || 'GET'
  ).toUpperCase();

  if (method === 'GET') ***REMOVED***
    // GET requests can always use standard form submits.
    return;
  ***REMOVED***

  var contentType =
    form.find('input[data-override="content-type"]').val() ||
    form.find('select[data-override="content-type"] option:selected').text();

  if (method === 'POST' && !contentType) ***REMOVED***
    // POST requests can use standard form submits, unless we have
    // overridden the content type.
    return;
  ***REMOVED***

  // At this point we need to make an AJAX form submission.
  e.preventDefault();

  var url = form.attr('action');
  var data;

  if (contentType) ***REMOVED***
    data = form.find('[data-override="content"]').val() || ''

    if (contentType === 'multipart/form-data') ***REMOVED***
      // We need to add a boundary parameter to the header
      // We assume the first valid-looking boundary line in the body is correct
      // regex is from RFC 2046 appendix A
      var boundaryCharNoSpace = "0-9A-Z'()+_,-./:=?";
      var boundaryChar = boundaryCharNoSpace + ' ';
      var re = new RegExp('^--([' + boundaryChar + ']***REMOVED***0,69***REMOVED***[' + boundaryCharNoSpace + '])[\\s]*?$', 'im');
      var boundary = data.match(re);
      if (boundary !== null) ***REMOVED***
        contentType += '; boundary="' + boundary[1] + '"';
      ***REMOVED***
      // Fix textarea.value EOL normalisation (multipart/form-data should use CR+NL, not NL)
      data = data.replace(/\n/g, '\r\n');
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    contentType = form.attr('enctype') || form.attr('encoding')

    if (contentType === 'multipart/form-data') ***REMOVED***
      if (!window.FormData) ***REMOVED***
        alert('Your browser does not support AJAX multipart form submissions');
        return;
      ***REMOVED***

      // Use the FormData API and allow the content type to be set automatically,
      // so it includes the boundary string.
      // See https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
      contentType = false;
      data = new FormData(form[0]);
    ***REMOVED*** else ***REMOVED***
      contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
      data = form.serialize();
    ***REMOVED***
  ***REMOVED***

  var ret = $.ajax(***REMOVED***
    url: url,
    method: method,
    data: data,
    contentType: contentType,
    processData: false,
    headers: ***REMOVED***
      'Accept': 'text/html; q=1.0, */*'
    ***REMOVED***,
  ***REMOVED***);

  ret.always(function(data, textStatus, jqXHR) ***REMOVED***
    if (textStatus != 'success') ***REMOVED***
      jqXHR = data;
    ***REMOVED***

    var responseContentType = jqXHR.getResponseHeader("content-type") || "";

    if (responseContentType.toLowerCase().indexOf('text/html') === 0) ***REMOVED***
      replaceDocument(jqXHR.responseText);

      try ***REMOVED***
        // Modify the location and scroll to top, as if after page load.
        history.replaceState(***REMOVED******REMOVED***, '', url);
        scroll(0, 0);
      ***REMOVED*** catch (err) ***REMOVED***
        // History API not supported, so redirect.
        window.location = url;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      // Not HTML content. We can't open this directly, so redirect.
      window.location = url;
    ***REMOVED***
  ***REMOVED***);

  return ret;
***REMOVED***

function captureSubmittingElement(e) ***REMOVED***
  var target = e.target;
  var form = this;

  form.clk = target;
***REMOVED***

$.fn.ajaxForm = function() ***REMOVED***
  var options = ***REMOVED******REMOVED***

  return this
    .unbind('submit.form-plugin  click.form-plugin')
    .bind('submit.form-plugin', options, doAjaxSubmit)
    .bind('click.form-plugin', options, captureSubmittingElement);
***REMOVED***;
