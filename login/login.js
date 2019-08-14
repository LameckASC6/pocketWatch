const database = firebase.database().ref();
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

    let profile = {
      email: googleUser.getBasicProfile().getEmail(),
      username: googleUser.getBasicProfile().getName(),
      image: googleUser.getBasicProfile().getImageUrl(),
      password: ""
    }

    database.child('users').push(profile);
    console.log(googleUser);
    window.location.href="../Overview/overview.html";
  }

  function onFailure(error) {
    console.log(error);
  }