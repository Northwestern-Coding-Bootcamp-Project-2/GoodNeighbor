const viewMessageHandler = async (event) => {
  event.preventDefault();
  let message_id = event.target.getAttribute('data-id');
  document.location.replace(`/api/message/${message_id}`);
};

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

document
  .querySelectorAll('.delete-msg-btn').forEach((element) => {
    element.addEventListener('click', delButtonHandler)
  });


document
  .querySelectorAll('.view-msg-btn').forEach((element) => {
    element.addEventListener('click', viewMessageHandler)
  });