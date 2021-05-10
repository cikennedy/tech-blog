// Signup form that is similar to login, but includes email information
const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && username && password) {
      // Send the username and password to the server
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Sends user to the dashboard if the login succeeds
      if (response.ok) {
        document.location.replace('/dashboard');
        console.log('Account Generated.')
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);  