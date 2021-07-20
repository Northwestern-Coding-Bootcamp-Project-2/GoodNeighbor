// Star request button, update button, delete button

const starRequestHandler = async (event) => {
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
        const response = await fetch(`/api/starred-request`, {
            method: 'POST',
            body: JSON.stringify({ request_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Request starred')
        } else {
            alert('Failed to star request');
        }
    }
};


const goBackHandler = async (event) => {
    event.preventDefault();
    let location_id = event.target.getAttribute('data-id');
    document.location.replace(`/api/location/${location_id}`);
}

// document
//     .querySelector('#star-req-btn')
//     .addEventListener('click', starRequestHandler);

document
    .querySelector('.go-back-btn')
    .addEventListener('click', goBackHandler);