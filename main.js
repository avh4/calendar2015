document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('authorize-button')
    .addEventListener('click', handleAuthClick);
}, false);

if (window.chrome.identity) {
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    document.getElementById('authorize-button').remove();
    console.log(token);
    makeChromeApiCall(token);
  });
}