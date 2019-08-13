const database = firebase.database();
let bcrypt = dcodeIO.bcrypt;


let username = document.getElementById("username");
let password = document.getElementById("password");
let signInButton= document.getElementById("submit_button");
let hashedPassword = bcrypt.hashSync(password.value, 10);

  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  function onFailure(error) {
    console.log(error);
  }

async function signIn(event) {
    event.preventDefault();
    console.log(database);
}

signInButton.addEventListener('click', signIn);

var leadsRef = database.ref('pocketwatch-dd456');
leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    });
});

function addMessage(data) {
    console.log(database);
    console.log(data);
}
