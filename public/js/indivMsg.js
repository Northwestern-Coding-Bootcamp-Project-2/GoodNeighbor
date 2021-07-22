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
    .querySelector('#del-msg-btn').addEventListener('click', delButtonHandler);