const deletePostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    // Send the post to the server
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'delete',
      });
  
    // Replaces dashboard if delete succeeds
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete blog post.');
    }
}

document.querySelector('.delete-post-form').addEventListener('submit', deletePostFormHandler);