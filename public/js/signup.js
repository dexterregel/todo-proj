/*
 *  vars
 */
import { serverUrl } from './index.js';

/*
 *  elements
 */
const signUpForm = document.getElementById('sign-up');
const errorMsg = document.getElementById('error-message');



async function signUp(email, username, password) {
  try {
    const res = fetch(`${serverUrl}/auth/register`, {
      method: POST,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, password})
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error('Error occurred during sign up:', err);
  }
}

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get and validate form data
  const signUpFormData = new FormData(signUpForm);
  const email = signUpFormData.get('email');
  const username = signUpFormData.get('username');
  const password = signUpFormData.get('password');
  const res = await signUp(email, username, password);
  const data = res.json()
  window.location.href = './index.html';
})




