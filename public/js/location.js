// View request button


const viewRequestHandler = async (event) => {
    event.preventDefault();
    let request_id = event.target.getAttribute('data-id');
    document.location.replace(`/api/request/${request_id}`);
};

document
    .querySelector('.request-search-container')
    .addEventListener('click', viewRequestHandler);
    