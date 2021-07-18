const dropDown = document.querySelector('#drop-down');
const selectArr = [];

async function locations() {
  const response = await fetch ('/api/signup');
  const locations = await response.json();
  return locations
}
locations().then(data => {
  console.log(data);
  for(i = 0; i < data.length; i++){
    let select = `<option data-locationid = "${data[i].id}" value="${i + 1}">${data[i].city}, ${data[i].state}</option>`;
    selectArr.push(select);
  }
  for(i = 0; i < selectArr.length; i++){
    const option = document.createElement('option'); 
    option.setAttribute('data-id', data[i].id);
    option.innerHTML = `${data[i].city}, ${data[i].state}`;
    dropDown.append(option);
  }
});
console.log(number);
console.log(dropDown);
const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
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
      body: JSON.stringify({ username, email, password, location_id}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  };
  document
  .querySelector('#signup-submit')
  .addEventListener('click', signupFormHandler);