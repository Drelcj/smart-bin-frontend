const scheduleList = document.getElementById("schedule-list");

function getUserSchedules() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:4000/api/schedule/get-schedules", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const schedules = JSON.parse(xhr.responseText);
      displaySchedules(schedules);
    } else {
      console.error("Error fetching schedules:", xhr.statusText);
    }
  };
  xhr.send();
}

function displaySchedules(schedules) {
  scheduleList.innerHTML = ""; // Clear existing content

  schedules.forEach(schedule => {
    const scheduleItem = document.createElement("li");
    scheduleItem.classList.add("schedule-item");

    // Structure for each schedule item:
    scheduleItem.innerHTML = `
      <span class="schedule-date">${schedule.date}</span>
      <span class="schedule-time">${schedule.time}</span>
      <span class="schedule-address">${schedule.address}</span>
      <span class="schedule-cancelled">${schedule.isCancelled ? "Cancelled" : "Active"}</span>
      <button class="cancel-btn" data-schedule-id="${schedule._id}">Cancel</button>
    `;

    scheduleList.appendChild(scheduleItem);
  });
}

// Call getUserSchedules on page load
getUserSchedules();

// Handle cancellation logic

function handleCancelClick(scheduleId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/schedule/cancel-schedule", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response.message); // Display success message
        // Update schedule list or handle success
      } else {
        console.error("Error cancelling schedule:", xhr.statusText);
      }
    };
    xhr.send(JSON.stringify({ id: scheduleId, cancelReason: "User cancellation" })); 
  }
  
  // Example: Assuming we have a function to get the schedule ID from the user interaction
  function handleUserInteraction(event) {
    const scheduleId = getScheduleIdFromEvent(event); // We'll create logic to extract ID
    handleCancelClick(scheduleId);
  }
  
