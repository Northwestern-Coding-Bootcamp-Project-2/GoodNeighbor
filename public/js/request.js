// save request button, update button, delete button

const saveRequestHandler = async (event) => {
    event.preventDefault();

    // Get the id from the request page somehow thru handlebars maybe and pass it thru the .create
    const title = document.querySelector('#title').value;
    const request = await fetch('/api/request', {
        method: 'GET',
        where: {
            title: title
        }
    });


    if (request) {
        const request_id = request.id;
        const response = await fetch(`/api/saved-request`, {
            method: 'POST',
            body: JSON.stringify({ request_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            let request_id = event.target.getAttribute('data-id');
            let saved = true;
            const responseTwo = await fetch(`/api/saved-request/${request_id}`, {
                method: 'PUT',
                body: JSON.stringify({ saved })
            })
        } else {
            alert('Failed to save request');
        }
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