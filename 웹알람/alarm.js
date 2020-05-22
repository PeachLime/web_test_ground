


window.onload = function() {
  var alarmPermissionRequestButton = document.getElementById('alarmPermissionRequestButton');
  var alarmButton = document.getElementById('alarmButton');
  var testButton = document.getElementById('testButton');

  function test() {
    alert('TEST')
  }


  function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // set the button to shown or hidden, depending on what the user answers
//      if(Notification.permission === 'denied' || Notification.permission === 'default') {
//        alarmPermissionRequestButton.style.display = 'block';
//      } else {
//        alarmPermissionRequestButton.style.display = 'none';
//      }
    }

    // Let's check if the browser supports notifications
    if (!"Notification" in window) {
      console.log("This browser does not support notifications.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      }
    }
  }


  // Function to check whether browser supports the promise version of requestPermission()
  // Safari only supports the old callback-based version
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }


  function notifyMe() {
    console.log('customLog: notification delay 5000');
    setTimeout(function() {
      console.log('delayed 5000');
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!", {
          body: "Hi there!"
        });
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Hi there!", {
              body: "Hi there!"
            });
          }
        });
      }

      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them any more.

    }, 5000);
    alert('알람 테스트')
  }



  alarmPermissionRequestButton.addEventListener('click', askNotificationPermission)
  alarmButton.addEventListener('click', notifyMe)
  testButton.addEventListener('click', test)
}
