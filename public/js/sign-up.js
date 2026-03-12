const serverUrl = 'https://localhost:403';

/*
 *  elements
 */
const signUpForm = document.getElementById('sign-up');
const emailField = document.getElementById('email');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');
const signUpBtn = document.getElementById('sign-up-btn');

/*
 *  functions
 */
async function signUp(email, username, password) {
  try {
    const res = await fetch(`${serverUrl}/auth/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, password})
    });

    if (!res.ok) {
      return {error: 'Error occured during sign up'}
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// show password toggles
document.addEventListener('click', (e) => {
  if (e.target.dataset.showPassword) {
    const showPasswordEl = e.target.dataset.showPassword;
    // toggle shoding the password field
    if (showPasswordEl === 'show-password') {
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
      } else if (passwordField.type = 'text') {
        passwordField.type = 'password';
      }
    // toggle showing the confirm password field
    } else if (showPasswordEl === 'show-confirm-password') {
      if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
      } else if (confirmPasswordField.type = 'text') {
        confirmPasswordField.type = 'password';
      }
    }
  }
});

// check if the form is filled out
function isFormFilledOut() {
  if (emailField.value
  && usernameField.value
  && passwordField.value === confirmPasswordField.value
  && passwordField.value != ''
  && confirmPasswordField.value != '') {
    return true;
  } else {
    return false;
  }
}

// activate the sign up button once the form is filled out
document.addEventListener('keyup', (e) => {
  if (isFormFilledOut()) {
    signUpBtn.disabled = false;
  } else {
    signUpBtn.disabled = true;
  }
});

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const signUpFormData = new FormData(signUpForm);
  const email = signUpFormData.get('email');
  const username = signUpFormData.get('username');
  const password = signUpFormData.get('password');

  const data = await signUp(email, username, password);
  signUpForm.reset();
  // if the user was successfully created,
  // this should navigate them back to the index
});