const loginForm = document.getElementById('signin-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(`http://localhost:4000/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    // Handle successful login
    const data = await response.json();
    console.log('Login successful:', data);

    // Validate token (replace with your validateToken logic)
    const isValidToken = await validateToken(data.token);
    if (isValidToken) {
      // Redirect to dashboard and store token (if applicable)
      window.location.href = '/dashboard';
      localStorage.setItem('token', data.token); // Optional: Store token for future requests
    } else {
      console.error('Invalid token received');
      // Handle invalid token (display error message, etc.)
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = 'Invalid login credentials or session expired.';
      errorMessageElement.style.display = 'block'; // Show the error message
    }
  } else {
    // Handle login failure
    const error = await response.text();
    console.error('Login failed:', error);
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = 'Login failed: ' + error;
    errorMessageElement.style.display = 'block'; // Show the error message
  }
  
});
