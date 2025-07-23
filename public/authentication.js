import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { config } from './FirebaseConfig.js';

const app = initializeApp(config);
const database = getDatabase(app);
const auth = getAuth(app);


function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('user-info').innerText = `Logged in as ${userCredential.user.email}`;
      window.location.href = 'index.html';
    })
    .catch(error => {
      alert(error.message);
    });
}

function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('user-info').innerText = `Signed up as ${userCredential.user.email}`;
    })
    .catch(error => {
      alert(error.message);
    });
}

// export default {login, signup};

document.addEventListener("DOMContentLoaded", () => {
const loginBtn = document.getElementById('loginBtn');
const SignUpBtn = document.getElementById('SignUpBtn');

if (loginBtn && SignUpBtn) {
    loginBtn.addEventListener("click", login);
    SignUpBtn.addEventListener("click", signup);
  } else {
    console.error("Login or SignUp button not found in the DOM.");
  }
});