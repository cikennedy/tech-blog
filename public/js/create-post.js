const createPostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.querySelector(`#post-title`).value.trim();
    const post_content = document.querySelector(`#post-content`).value.trim();
    

    // Send the post to the server
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
    // Replaces dashboard if post succeeds
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to post blog.');
    }
}

document.querySelector('.create-post-form').addEventListener('submit', createPostFormHandler);