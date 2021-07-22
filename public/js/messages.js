const viewMessageHandler = async (event) => {
  event.preventDefault();
  let message_id = event.target.getAttribute('data-id');
  document.location.replace(`/api/message/${message_id}`);
};


document
  .querySelectorAll('.view-msg-btn').forEach((element) => {
    element.addEventListener('click', viewMessageHandler)
  });

