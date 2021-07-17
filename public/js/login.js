/*===================
        SIGNUP  
===================*/

const signUpFormHandler = async (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value.trim();
    const zipcode = document.querySelector('#zipcode').value.trim();
    
    const response = await fetch ('/api/signup', {
        method: 'POST',
        body: JSON.stringify({username, email, password, city, state, zipcode}),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert('Something didnt work');
    }
  }

  const submitForm = document.querySelector('#signup-submit');
  console.log(submitForm);

submitForm.addEventListener('click', signUpFormHandler);


/*===================
        LOGIN 
===================*/

const loginFormHandler = async (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    const response = await fetch ('/api/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert('Something didnt work');
    }
  }

  const submitForm = document.querySelector('#login-submit');

 submitForm.addEventListener('click', loginFormHandler);