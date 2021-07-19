const dropDown = document.querySelector('#drop-down');
const dropDownTwo = document.querySelector('#drop-down-2');

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
  locations().then(data => {
    console.log(data);
      for(i = 0; i < data.length; i++){
        const option = document.createElement('option'); 
        option.setAttribute('data-id', data[i].id);
        option.innerHTML = `${data[i].city}, ${data[i].state}`;
        dropDownTwo.append(option);
        console.log(option);
      }
  });

const searchFormHandler = async (event) => {
    event.preventDefault();
    const location_id = dropDown.options[dropDown.selectedIndex].getAttribute('data-id');
    if (location_id) {
        const response = await fetch(`/api/location/${location_id}`, {
          method: 'GET'
        });
      
        if (response.ok) {
          document.location.replace(`/api/location/:${location_id}`);
        } else {
          alert(response.statusText);
        }
      }
}
const makeFormHandler = async (event) => {
    event.preventDefault();
    const poster_id = 4;
    const title = document.querySelector('#title').value.trim();    
    const text = document.querySelector('#text').value.trim();
    const image_link = document.querySelector('#image-link').value.trim();
    const location_id = dropDown.options[dropDown.selectedIndex].getAttribute('data-id');

    if (title && text && image_link) {
        const response = await fetch('/api/request', {
          method: 'POST',
          body: JSON.stringify({ poster_id, title, text, image_link, location_id}),
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
    }
}

document
  .querySelector('#submit-request-btn')
  .addEventListener('click', makeFormHandler);

document
  .querySelector('#submit-search-btn')
  .addEventListener('click', searchFormHandler);