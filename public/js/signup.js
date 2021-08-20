const dropDown = document.querySelector('#drop-down');

//<option value="1">One</option>
//<option value="2">Two</option>
//<option value="3">Three</option>

async function locations() {
  const response = await fetch ('/api/signup');
  const locations = await response.json();
  return locations
}
locations().then(data => {
  console.log(data);
  for(i = 0; i < data.length; i++){
    const option = document.createElement('option'); 
    option.setAttribute('data-id', data[i].id);
    option.innerHTML = `${data[i].city}, ${data[i].state}`;
    dropDown.append(option);
    console.log(option);
  }
});

console.log(dropDown);


const signupFormHandler = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const image_link = document.querySelector('#image_link').value.trim();
  const location_id = dropDown.options[dropDown.selectedIndex].getAttribute('data-id');
  console.log(location_id);
  /*
  const options = function(event){
    let option_doj = dropDown.options[dropDown.selectedIndex].getAttribute('data-id')
    return option_doj;
  }
  */

  if (username && email && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, location_id, image_link}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  };

  document
  .querySelector('#signup-submit')
  .addEventListener('click', signupFormHandler);