const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');

signupButton.addEventListener('click', async () => {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('contact-email').value;
  const password = document.getElementById('password').value;

  // Validating data on the frontend 
  if (!firstName || !lastName || !email || !password) {
    alert('Please fill in all fields!');
    return;
  }

  // Sending data to the backend using Fetch API
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    })
  });

  const data = await response.json();

  if (data.success) {
    alert('Signup successful! Please check your email for verification.');
    signupForm.reset();
  } else {
    alert('Signup failed: ' + data.message);
  }
});
