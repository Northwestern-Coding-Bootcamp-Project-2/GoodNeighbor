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

  document
  .querySelector('#send-msg-btn').addEventListener('click', newMessageHandler);

document
    .querySelector('.save-req-btn')
    .addEventListener('click', saveRequestHandler);

document
    .querySelector('.go-back-btn')
    .addEventListener('click', goBackHandler);