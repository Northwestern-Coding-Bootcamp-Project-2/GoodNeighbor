const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/message/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/message');
      } else {
        alert('Failed to delete message');
      }
    }
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
    .querySelector('#del-msg-btn').addEventListener('click', delButtonHandler);