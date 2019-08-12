const database = firebase.database().ref();
let bcrypt = dcodeIO.bcrypt;

let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

let signUpButton = document.getElementById("submit_button");

let emailCheck = /\w+\@\w+\.\w+/;
let passwordCheck = /\w{6}/;

function signUp(event) {
    event.preventDefault();

    let emailPass = true;
    let passwordPass1 = true;
    let passwordPass2 = true;
    
    if (!emailCheck.test(email.value)) {
        alert("email not correct");
        emailPass = false;
    }
    if (!passwordCheck.test(password.value)) {
        alert("Password needs to be 6 characters or longer");
        passwordPass1 = false;
    }

    if (password.value != confirmPassword.value) {
        alert("Password's aren't the same");
        passwordPass2 = false;
    }
    
    let hashedPassword = bcrypt.hashSync(password.value, 10);
    
    const value = {
        Email: email.value,
        Username: username.value,
        Password: hashedPassword
    }

    //Update database here
    if(emailPass == true && passwordPass1 == true && passwordPass2 == true){
        console.log("Valid inputs");
        database.push(value);
    }
}




signUpButton.addEventListener('click', signUp);