const commentFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const comment_content = document.querySelector(`#comment-text`).value.trim();
    
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    if (comment_content) {
      // Send the comment to the server
      const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({ comment_content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      //
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to comment');
      }
    }
  };

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);