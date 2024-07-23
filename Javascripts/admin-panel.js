const userList = document.getElementById("user-list");
const scheduleList = document.getElementById("schedule-list");
const articleForm = document.getElementById("article-form");

async function fetchUsers() {
  const response = await fetch("/users");
  const data = await response.json();

  if (data.success) {
    userList.innerHTML = ""; // Clear existing content
    data.users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${user.email}</td> <td>${user.firstName}</td> <td>${user.lastName}</td>`;
      userList.appendChild(row);
    });
  } else {
    console.error("Error fetching users:", data.message);
    // Handle error scenario (e.g., display error message)
  }
}

async function fetchSchedules() {
  const response = await fetch("/admin/schedules");
  const data = await response.json();

  if (data.success) {
    scheduleList.innerHTML = ""; // Clear existing content
    data.reservations.forEach((schedule) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${schedule.user.email}</td>
          <td>${schedule.restaurant.name}</td>
          <td>${schedule.dateTime}</td>
          <td><button data-schedule-id="${schedule._id}">Cancel</button></td>`;
      scheduleList.appendChild(row);
    });

    const cancelButtons = document.querySelectorAll("[data-schedule-id]");
    cancelButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const scheduleId = event.target.dataset.scheduleId;
        const response = await fetch(`/admin/schedules/${scheduleId}/cancel`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (data.success) {
          console.log("Schedule canceled successfully!");
          // Update the schedule list UI to reflect the cancellation
          fetchSchedules(); // Refresh schedule list
        } else {
          console.error("Error canceling schedule:", data.message);
          // Handle error scenario (e.g., display error message)
        }
      });
    });
  } else {
    console.error("Error fetching schedules:", data.message);
    // Handle error scenario (e.g., display error message)
  }
}

// Function to create article on form submission
articleForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
  
    try {
      const response = await fetch("/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
  
      if (data.success) {
        console.log("Article created successfully!");
        // Clear form fields
        articleForm.reset();
        // Update the article list on other pages (if applicable)
      } else {
        console.error("Error creating article:", data.message);
        // Handle error scenario (e.g., display error message)
      }
    } catch (error) {
      console.error("Error creating article:", error.message);
      // Handle network errors
    }
  });

fetchUsers(); // Call function to fetch users on page load
fetchSchedules(); // Call function to fetch schedules on page load
