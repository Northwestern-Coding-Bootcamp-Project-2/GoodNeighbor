const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the homepage page
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
  };

const signupFormHandler = async (event) => {
event.preventDefault();

const username = document.querySelector('#username').value.trim();
const email = document.querySelector('#email').value.trim();
const password = document.querySelector('#password').value.trim();
const city = document.querySelector('#city').value.trim();
const state = document.querySelector('#state').value.trim();
const zipcode = document.querySelector('#zipcode').value.trim();

if (username && email && password) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, city, state, zipcode }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/homepage');
  } else {
    alert(response.statusText);
  }
}
};

document
.querySelector('.login-form')
.addEventListener('click', loginFormHandler);

document
.querySelector('#signup-submit')
.addEventListener('click', signupFormHandler);