// save request button, update button, delete button

const saveRequestHandler = async (event) => {
  event.preventDefault();

  // Get the id from the request page somehow thru handlebars maybe and pass it thru the .create
  const request_id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/saved-request`, {
    method: 'POST',
    body: JSON.stringify({ request_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log('Saved!')
    document.location.replace(`/api/request/${request_id}`);
  } else {
    alert('Failed to save request');
  }
};



const goBackHandler = async (event) => {
  event.preventDefault();
  let location_id = event.target.getAttribute('data-id');
  document.location.replace(`/api/location/${location_id}`);
};

const newMessageHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#text').value.trim();
  const image_link = document.querySelector('#image-link').value.trim();
  const title = document.querySelector('#title').value.trim();
  const recipient_id = document.querySelector('#recipient-id').innerHTML;

  console.log(title);
  console.log(text);
  console.log(image_link);
  console.log(recipient_id);

  if (text && title && recipient_id) {

    const response = await fetch(`/api/message`, {
      method: 'POST',
      body: JSON.stringify({ title, text, image_link, recipient_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Message Sent!');
    } else {
      alert('Failed to send message');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/request/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete request');
    }
  }
};

const updateReqHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const location_id = event.target.getAttribute('data-location');
    const text = document.querySelector('#text').value.trim();
    const image_link = document.querySelector('#image-link').value.trim();
    const title = document.querySelector('#title').value.trim();

    console.log(title);
    console.log(text);
    console.log(image_link);
    console.log(id);
    console.log(location_id);

    if (text && title) {

      const response = await fetch(`/api/request/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text, image_link, location_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('request Sent!');
      } else {
        alert('Failed to send request');
      }
    }
  }
}

const currId = document.querySelector("#update-req-btn").getAttribute("data-user");
const reqId = document.querySelector("#update-req-btn").getAttribute("data-id");
const reqBtn = document.querySelector("#update-req-btn");
const delBtn = document.querySelector("#del-req-btn");

if (reqId !== currId) {
  reqBtn.style.display = "none";
  delBtn.style.display = "none";
} 

document
  .querySelector('#submit-update-btn').addEventListener('click', updateReqHandler);

document
  .querySelector('#del-req-btn').addEventListener('click', delButtonHandler);

document
  .querySelector('#send-msg-btn').addEventListener('click', newMessageHandler);

document
  .querySelector('.save-req-btn')
  .addEventListener('click', saveRequestHandler);

document
  .querySelector('.go-back-btn')
  .addEventListener('click', goBackHandler);