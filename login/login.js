const database = firebase.database().ref();
let bcrypt = dcodeIO.bcrypt;

window.onbeforeunload = function(e) {
  gapi.auth2.getAuthInstance().signOut();
};

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
      password: hashedPassword
    }
    database.child('users').push(profile);
    window.location.href="../Overview/overview.html";
  }

  function onFailure(error) {
    console.log(error);
  }

  // database.child('users').orderByChild('username').equalTo(username).on('value', newUser);

  // function newUser(data) {
  //     console.log(database);
  //     console.log(data);
      //}
  //let usernameCheck = firebase.database().ref().child('users').orderByChild('username').equalTo(username).on("value");
  // console.log(usernameCheck.val())
  // async function signIn(event) {
  //   event.preventDefault();
  //   let username = document.getElementById('username').value;
    
  //   console.log(usernameCheck);
    
    // console.log(usernameCheck);
    // usernameCheck = usernameCheck.val();
    // console.log(usernameCheck);
    // if (!usernameCheck) {
    //     console.log("Incorrect Username");
    // } else {
    //     let password = document.getElementById('password').value;
    //     let userPassword;
    //     for (key in usernameCheck) {
    //         userPassword = usernameCheck[key].password;
    //     }
    //     if (bcrypt.compareSync(password, userPassword)) {
    //         for (key in emailCheck) {
    //             sessionStorage.setItem('userKey', key);
    //         }
    //         window.location.href = "../Overview/overview.html";
    //     } else {
    //         console.log("Incorrect Password");
    //     }
    // }
//}

// signInButton.addEventListener('click', signIn);


