console.log('Hello, World! This is the main.js file.');

const form = document.getElementById('contact-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get form values
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const message = form.elements['message'].value;
    // Simple validation
    if (name && email && message) {
        fetch('http://localhost:3000/enquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        alert(`Thank you, ${name}! Your message has been received.`);

        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while submitting your enquiry. Please try again later.');
        }); 

        form.reset(); // Reset the form after submission
    } else {
        alert('Please fill in all fields before submitting.');
    }
});