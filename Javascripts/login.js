// const loginForm = document.getElementById("login-form");

// loginForm.addEventListener("submit", async (event) => {
//   event.preventDefault(); // Prevent default form submission

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   try {
//     const response = await fetch("/login-admin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (data.success) {
//       // Login successful, handle success scenario
//       console.log("Login successful!", data.message);
//       storeToken(data.token); // Store the token securely
//       redirectUser(data.user.role); // Redirect based on user role
//     } else {
//       // Login failed, display error message
//       console.error("Login failed:", data.message);
//       // Display error message to the user
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     // Handle errors appropriately (e.g., display generic error message)
//   }
// });

// function storeToken(token) {
//   // Secure storage with HttpOnly flag (manual approach)
//   const expiryDate = new Date();
//   expiryDate.setDate(expiryDate.getDate() + 1); // Expires in 1 day

//   document.cookie = `auth-token=${token}; Expires=${expiryDate.toUTCString()}; Path=/; HttpOnly`;
// }

// function redirectUser(role) {
//   if (role === "ADMIN") {
//     window.location.href = "/admin-panel"; // Redirect to admin panel
//   } else {
//     window.location.href = "/user-dashboard"; // Redirect to user dashboard
//   }
// }
