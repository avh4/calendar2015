// From http://googleappsdeveloper.blogspot.com/2011/12/using-new-js-library-to-unlock-power-of.html

var clientId = '28903411901-vqu42sh3sfe679a6q3rv44d1e1l7kivu.apps.googleusercontent.com';
var apiKey = 'dlhtyevTzMwwCVHqRTKa1EkL';
var scopes = 'https://www.googleapis.com/auth/calendar.readonly';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

var loadedData = null;

function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'singleEvents': true,
      // TODO: use today's date
      "timeMin": "2014-11-01T00:00:00-08:00",
      "timeMax": "2014-12-01T00:00:00-08:00",
    });
    
    request.execute(function(resp) {
      console.log("Loaded calendar data", resp);
      loadedData = processCalendar(resp);
      if (waitingCallback) {
        waitingCallback(loadedData);
      }
    });
  });
}

function processCalendar(resp) {
  var result = [];
  for (var i = 0; i < 31; i++) {
    result.push(0);
  }
  var items = resp.items;
  items.forEach(function(item) {
    if (!item.start.dateTime) return;
    var yearMonth = item.start.dateTime.slice(0,7);
    if (yearMonth != "2014-11") return; // TODO: use today's date
    var day = parseInt(item.start.dateTime.slice(8,10));
    result[day] += 1;
  });
  console.log("Calendar results", result)
  return result;
}


function loadCalendar(callback) {
  if (loadedData) {
    callback(loadedData);
  } else {
    waitingCallback = callback;
  }
}