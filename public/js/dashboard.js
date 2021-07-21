const dropDown = document.querySelector('#drop-down');
const dropDownTwo = document.querySelector('#drop-down-2');

async function locations() {
  const response = await fetch('/api/signup');
  const locations = await response.json();
  return locations
}
locations().then(data => {
  for (i = 0; i < data.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('data-id', data[i].id);
    option.innerHTML = `${data[i].city}, ${data[i].state}`;
    dropDown.append(option);
  }
});
locations().then(data => {
  for (i = 0; i < data.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('data-id', data[i].id);
    option.innerHTML = `${data[i].city}, ${data[i].state}`;
    dropDownTwo.append(option);
  }
});

const searchFormHandler = async (event) => {
  event.preventDefault();
  const location_id = dropDownTwo.options[dropDownTwo.selectedIndex].getAttribute('data-id');
  if (location_id) {
    const response = await fetch(`/api/location/${location_id}`, {
      method: 'GET'
    });

    if (response.ok) {
      document.location.replace(`/api/location/${location_id}`);
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
      body: JSON.stringify({ poster_id, title, text, image_link, location_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

const unsaveRequestHandler = async (event) => {
  event.preventDefault();

  // Get the id from the request page somehow thru handlebars maybe and pass it thru the .create
  const request_id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/saved-request/${request_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ request_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // let request_id = event.target.getAttribute('data-id');
    // let saved = false;
    // const responseTwo = await fetch(`/api/saved-request/${request_id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ saved })
    // })
    // if (!responseTwo.ok) {
    //   alert('Failed to save request')
    // }
    console.log('Request Unsaved!')
  } else {
    alert('Failed to save request');
  }
};

document
  .querySelector('#submit-request-btn')
  .addEventListener('click', makeFormHandler);

document
  .querySelector('#submit-search-btn')
  .addEventListener('click', searchFormHandler);

document
  .querySelector('.unsave-req-btn')
  .addEventListener('click', unsaveRequestHandler);