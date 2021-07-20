const newMessageHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#text').value.trim();
    const image_link = document.querySelector('#image-link').value.trim();
    const description = document.querySelector('#desc').value.trim();
  
    if (text && description) {
      const response = await fetch(`/api/message`, {
        method: 'POST',
        body: JSON.stringify({ text, image_link, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/message');
      } else {
        alert('Failed to send message');
      }
    }
};

const viewMessageHandler = async (event) => {
  event.preventDefault();
  let message_id = event.target.getAttribute('data-id');
  document.location.replace(`/api/message/${message_id}`);
};

document
  .querySelector('.msg-container')
  .addEventListener('click', viewMessageHandler);


document
  .querySelector('#send-msg-btn')
  .addEventListener('submit', newMessageHandler);