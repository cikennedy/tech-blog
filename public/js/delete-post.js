async function deleteFormHandler(event) {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send to the server
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });
 
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete blog post.');
    }
}

document.querySelector('.delete-btn').addEventListener('click', deleteFormHandler);