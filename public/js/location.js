// View request button


const viewRequestHandler = async (event) => {
    event.preventDefault();
    let request_id = event.target.getAttribute('data-id');
    document.location.replace(`/api/request/${request_id}`);
};

document
  .querySelectorAll('.view-req-btn').forEach((element) => {
    element.addEventListener('click', viewRequestHandler)
  });