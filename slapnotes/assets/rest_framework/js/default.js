$(document).ready(function() ***REMOVED***
  // JSON highlighting.
  prettyPrint();

  // Bootstrap tooltips.
  $('.js-tooltip').tooltip(***REMOVED***
    delay: 1000,
    container: 'body'
  ***REMOVED***);

  // Deal with rounded tab styling after tab clicks.
  $('a[data-toggle="tab"]:first').on('shown', function(e) ***REMOVED***
    $(e.target).parents('.tabbable').addClass('first-tab-active');
  ***REMOVED***);

  $('a[data-toggle="tab"]:not(:first)').on('shown', function(e) ***REMOVED***
    $(e.target).parents('.tabbable').removeClass('first-tab-active');
  ***REMOVED***);

  $('a[data-toggle="tab"]').click(function() ***REMOVED***
    document.cookie = "tabstyle=" + this.name + "; path=/";
  ***REMOVED***);

  // Store tab preference in cookies & display appropriate tab on load.
  var selectedTab = null;
  var selectedTabName = getCookie('tabstyle');

  if (selectedTabName) ***REMOVED***
    selectedTabName = selectedTabName.replace(/[^a-z-]/g, '');
  ***REMOVED***

  if (selectedTabName) ***REMOVED***
    selectedTab = $('.form-switcher a[name=' + selectedTabName + ']');
  ***REMOVED***

  if (selectedTab && selectedTab.length > 0) ***REMOVED***
    // Display whichever tab is selected.
    selectedTab.tab('show');
  ***REMOVED*** else ***REMOVED***
    // If no tab selected, display rightmost tab.
    $('.form-switcher a:first').tab('show');
  ***REMOVED***

  $(window).load(function() ***REMOVED***
    $('#errorModal').modal('show');
  ***REMOVED***);
***REMOVED***);
