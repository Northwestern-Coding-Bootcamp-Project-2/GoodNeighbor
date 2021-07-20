// View request button


const viewRequestHandler = async (event) => {
    event.preventDefault();
    let request_id = event.target.getAttribute('data-id');
    document.location.replace(`/api/request/${request_id}`);
};

const theButtons = document.querySelector('#view-req-btn')
for (i = 0; i < theButtons.clientHeight; i++) {
    theButtons[i].addEventListener('click', viewRequestHandler);
}
    