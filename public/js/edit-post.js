const editPostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page

    const title = document.querySelector(`input[name="post-title"]`).value.trim();
    const post_content = document.querySelector(`textarea[name="post-text"]`).value.trim();

    console.log(title, post_content);

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    if (title && post_content) {
      // Send the username and password to the server
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'put',
        body: JSON.stringify({ title, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Sends user to the dashboard if the login succeeds
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit blog post.');
      }
    }
  };

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);