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

document
  .querySelector('#send-msg-btn')
  .addEventListener('submit', newMessageHandler);