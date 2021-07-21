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
    } else {
        alert('Failed to save request');
    }
};


const goBackHandler = async (event) => {
    event.preventDefault();
    let location_id = event.target.getAttribute('data-id');
    document.location.replace(`/api/location/${location_id}`);
}

document
    .querySelector('.save-req-btn')
    .addEventListener('click', saveRequestHandler);

document
    .querySelector('.go-back-btn')
    .addEventListener('click', goBackHandler);