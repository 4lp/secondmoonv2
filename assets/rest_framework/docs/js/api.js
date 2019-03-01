var responseDisplay = 'data'
var coreapi = window.coreapi
var schema = window.schema

function normalizeKeys (arr) ***REMOVED***
  var _normarr = [];
  for (var i = 0; i < arr.length; i++) ***REMOVED***
    _normarr = _normarr.concat(arr[i].split(' > '));
  ***REMOVED***
  return _normarr;
***REMOVED***

function normalizeHTTPHeader (str) ***REMOVED***
  // Capitalize HTTP headers for display.
  return (str.charAt(0).toUpperCase() + str.substring(1))
    .replace(/-(.)/g, function ($1) ***REMOVED***
      return $1.toUpperCase()
    ***REMOVED***)
    .replace(/(Www)/g, function ($1) ***REMOVED***
      return 'WWW'
    ***REMOVED***)
    .replace(/(Xss)/g, function ($1) ***REMOVED***
      return 'XSS'
    ***REMOVED***)
    .replace(/(Md5)/g, function ($1) ***REMOVED***
      return 'MD5'
    ***REMOVED***)
***REMOVED***

function formEntries (form) ***REMOVED***
  // Polyfill for new FormData(form).entries()
  var formData = new FormData(form)
  if (formData.entries !== undefined) ***REMOVED***
    return Array.from(formData.entries())
  ***REMOVED***

  var entries = []

  for (var i = 0; i < form.elements.length; i++) ***REMOVED***
    var element = form.elements[i]

    if (!element.name) ***REMOVED***
      continue
    ***REMOVED***

    if (element.type === 'file') ***REMOVED***
      for (var j = 0; j < element.files.length; j++) ***REMOVED***
        entries.push([element.name, element.files[j]])
      ***REMOVED***
    ***REMOVED*** else if (element.type === 'select-multiple' || element.type === 'select-one') ***REMOVED***
      for (var j = 0; j < element.selectedOptions.length; j++) ***REMOVED***
        entries.push([element.name, element.selectedOptions[j].value])
      ***REMOVED***
    ***REMOVED*** else if (element.type === 'checkbox') ***REMOVED***
      if (element.checked) ***REMOVED***
        entries.push([element.name, element.value])
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      entries.push([element.name, element.value])
    ***REMOVED***
  ***REMOVED***

  return entries
***REMOVED***

$(function () ***REMOVED***
  var $selectedAuthentication = $('#selected-authentication')
  var $authControl = $('#auth-control')
  var $authTokenModal = $('#auth_token_modal')
  var $authBasicModal = $('#auth_basic_modal')
  var $authSessionModal = $('#auth_session_modal')

  // Language Control
  $('#language-control li').click(function (event) ***REMOVED***
    event.preventDefault()
    var $languageMenuItem = $(this).find('a')
    var $languageControls = $(this).closest('ul').find('li')
    var $languageControlLinks = $languageControls.find('a')
    var language = $languageMenuItem.data('language')

    $languageControlLinks.not('[data-language="' + language + '"]').parent().removeClass('active')
    $languageControlLinks.filter('[data-language="' + language + '"]').parent().addClass('active')

    $('#selected-language').text(language)

    var $codeBlocks = $('pre.highlight')
    $codeBlocks.not('[data-language="' + language + '"]').addClass('hide')
    $codeBlocks.filter('[data-language="' + language + '"]').removeClass('hide')
  ***REMOVED***)

  // API Explorer
  $('form.api-interaction').submit(function (event) ***REMOVED***
    event.preventDefault()

    var $form = $(this).closest('form')
    var $requestMethod = $form.find('.request-method')
    var $requestUrl = $form.find('.request-url')
    var $toggleView = $form.closest('.modal-content').find('.toggle-view')
    var $responseStatusCode = $form.find('.response-status-code')
    var $meta = $form.find('.meta')
    var $responseRawResponse = $form.find('.response-raw-response')
    var $requestAwaiting = $form.find('.request-awaiting')
    var $responseRaw = $form.find('.response-raw')
    var $responseData = $form.find('.response-data')
    var key = normalizeKeys($form.data('key'))
    var params = ***REMOVED******REMOVED***
    var entries = formEntries($form.get()[0])

    for (var i = 0; i < entries.length; i++) ***REMOVED***
      var entry = entries[i]
      var paramKey = entry[0]
      var paramValue = entry[1]
      var $elem = $form.find('[name="' + paramKey + '"]')
      var dataType = $elem.data('type') || 'string'

      if (dataType === 'integer' && paramValue) ***REMOVED***
        var value = parseInt(paramValue)
        if (!isNaN(value)) ***REMOVED***
          params[paramKey] = value
        ***REMOVED***
      ***REMOVED*** else if (dataType === 'number' && paramValue) ***REMOVED***
        var value = parseFloat(paramValue)
        if (!isNaN(value)) ***REMOVED***
          params[paramKey] = value
        ***REMOVED***
      ***REMOVED*** else if (dataType === 'boolean' && paramValue) ***REMOVED***
        var value = ***REMOVED***
          'true': true,
          'false': false
        ***REMOVED***[paramValue.toLowerCase()]
        if (value !== undefined) ***REMOVED***
          params[paramKey] = value
        ***REMOVED***
      ***REMOVED*** else if (dataType === 'array' && paramValue) ***REMOVED***
        try ***REMOVED***
          params[paramKey] = JSON.parse(paramValue)
        ***REMOVED*** catch (err) ***REMOVED***
          // Ignore malformed JSON
        ***REMOVED***
      ***REMOVED*** else if (dataType === 'object' && paramValue) ***REMOVED***
        try ***REMOVED***
          params[paramKey] = JSON.parse(paramValue)
        ***REMOVED*** catch (err) ***REMOVED***
          // Ignore malformed JSON
        ***REMOVED***
      ***REMOVED*** else if (dataType === 'string' && paramValue) ***REMOVED***
        params[paramKey] = paramValue
      ***REMOVED***
    ***REMOVED***

    $form.find(':checkbox').each(function (index) ***REMOVED***
      // Handle unselected checkboxes
      var name = $(this).attr('name')
      if (!params.hasOwnProperty(name)) ***REMOVED***
        params[name] = false
      ***REMOVED***
    ***REMOVED***)

    function requestCallback (request) ***REMOVED***
      // Fill in the "GET /foo/" display.
      var parser = document.createElement('a')
      parser.href = request.url
      var method = request.options.method
      var path = parser.pathname + parser.hash + parser.search

      $requestMethod.text(method)
      $requestUrl.text(path)
    ***REMOVED***

    function responseCallback (response, responseText) ***REMOVED***
      // Display the 'Data'/'Raw' control.
      $toggleView.removeClass('hide')

      // Fill in the "200 OK" display.
      $responseStatusCode.removeClass('label-success').removeClass('label-danger')
      if (response.ok) ***REMOVED***
        $responseStatusCode.addClass('label-success')
      ***REMOVED*** else ***REMOVED***
        $responseStatusCode.addClass('label-danger')
      ***REMOVED***
      $responseStatusCode.text(response.status)
      $meta.removeClass('hide')

      // Fill in the Raw HTTP response display.
      var panelText = 'HTTP/1.1 ' + response.status + ' ' + response.statusText + '\n'
      response.headers.forEach(function (header, key) ***REMOVED***
        panelText += normalizeHTTPHeader(key) + ': ' + header + '\n'
      ***REMOVED***)
      if (responseText) ***REMOVED***
        panelText += '\n' + responseText
      ***REMOVED***
      $responseRawResponse.text(panelText)
    ***REMOVED***

    // Instantiate a client to make the outgoing request.
    var options = ***REMOVED***
      requestCallback: requestCallback,
      responseCallback: responseCallback
    ***REMOVED***

    // Setup authentication options.
    if (window.auth && window.auth.type === 'token') ***REMOVED***
      // Header authentication
      options.auth = new coreapi.auth.TokenAuthentication(***REMOVED***
        scheme: window.auth.scheme,
        token: window.auth.token
      ***REMOVED***)
    ***REMOVED*** else if (window.auth && window.auth.type === 'basic') ***REMOVED***
      // Basic authentication
      options.auth = new coreapi.auth.BasicAuthentication(***REMOVED***
        username: window.auth.username,
        password: window.auth.password
      ***REMOVED***)
    ***REMOVED*** else if (window.auth && window.auth.type === 'session') ***REMOVED***
      // Session authentication
      options.auth = new coreapi.auth.SessionAuthentication(***REMOVED***
        csrfCookieName: 'csrftoken',
        csrfHeaderName: 'X-CSRFToken'
      ***REMOVED***)
    ***REMOVED***

    var client = new coreapi.Client(options)
    client.action(schema, key, params).then(function (data) ***REMOVED***
      var response = JSON.stringify(data, null, 2)
      $requestAwaiting.addClass('hide')
      $responseRaw.addClass('hide')
      $responseData.addClass('hide').text('').jsonView(response)

      if (responseDisplay === 'data') ***REMOVED***
        $responseData.removeClass('hide')
      ***REMOVED*** else ***REMOVED***
        $responseRaw.removeClass('hide')
      ***REMOVED***
    ***REMOVED***).catch(function (error) ***REMOVED***
      var response = JSON.stringify(error.content, null, 2)
      $requestAwaiting.addClass('hide')
      $responseRaw.addClass('hide')
      $responseData.addClass('hide').text('').jsonView(response)

      if (responseDisplay === 'data') ***REMOVED***
        $responseData.removeClass('hide')
      ***REMOVED*** else ***REMOVED***
        $responseRaw.removeClass('hide')
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)

  // 'Data'/'Raw' control
  $('.toggle-view button').click(function () ***REMOVED***
    var $modalContent = $(this).closest('.modal-content')
    var $modalResponseRaw = $modalContent.find('.response-raw')
    var $modalResponseData = $modalContent.find('.response-data')

    responseDisplay = $(this).data('display-toggle')

    $(this).removeClass('btn-default').addClass('btn-info').siblings().removeClass('btn-info')

    if (responseDisplay === 'raw') ***REMOVED***
      $modalResponseRaw.removeClass('hide')
      $modalResponseData.addClass('hide')
    ***REMOVED*** else ***REMOVED***
      $modalResponseData.removeClass('hide')
      $modalResponseRaw.addClass('hide')
    ***REMOVED***
  ***REMOVED***)

  // Authentication: none
  $authControl.find("[data-auth='none']").click(function (event) ***REMOVED***
    event.preventDefault()
    window.auth = null
    $selectedAuthentication.text('none')
    $authControl.find("[data-auth]").closest('li').removeClass('active')
    $authControl.find("[data-auth='none']").closest('li').addClass('active')
  ***REMOVED***)

  // Authentication: token
  $('form.authentication-token-form').submit(function (event) ***REMOVED***
    event.preventDefault()
    var $form = $(this).closest('form')
    var scheme = $form.find('input#scheme').val()
    var token = $form.find('input#token').val()
    window.auth = ***REMOVED***
      'type': 'token',
      'scheme': scheme,
      'token': token
    ***REMOVED***
    $selectedAuthentication.text('token')
    $authControl.find("[data-auth]").closest('li').removeClass('active')
    $authControl.find("[data-auth='token']").closest('li').addClass('active')
    $authTokenModal.modal('hide')
  ***REMOVED***)

  // Authentication: basic
  $('form.authentication-basic-form').submit(function (event) ***REMOVED***
    event.preventDefault()
    var $form = $(this).closest('form')
    var username = $form.find('input#username').val()
    var password = $form.find('input#password').val()
    window.auth = ***REMOVED***
      'type': 'basic',
      'username': username,
      'password': password
    ***REMOVED***
    $selectedAuthentication.text('basic')
    $authControl.find("[data-auth]").closest('li').removeClass('active')
    $authControl.find("[data-auth='basic']").closest('li').addClass('active')
    $authBasicModal.modal('hide')
  ***REMOVED***)

  // Authentication: session
  $('form.authentication-session-form').submit(function (event) ***REMOVED***
    event.preventDefault()
    window.auth = ***REMOVED***
      'type': 'session'
    ***REMOVED***
    $selectedAuthentication.text('session')
    $authControl.find("[data-auth]").closest('li').removeClass('active')
    $authControl.find("[data-auth='session']").closest('li').addClass('active')
    $authSessionModal.modal('hide')
  ***REMOVED***)
***REMOVED***)
