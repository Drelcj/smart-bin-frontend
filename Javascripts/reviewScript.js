const reviewForm = document.getElementById('review-form');
const reviewMessage = document.getElementById('review-message');

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const stars = document.getElementById('stars').value;
  const review = document.getElementById('review').value;

    const response = await submitReview(stars, review);

  if (response.success) {
    reviewMessage.textContent = 'Review submitted successfully!';
    reviewForm.reset(); // Clear the form after successful submission
  } else {
    reviewMessage.textContent = response.message || 'An error occurred.';
  }
});

// Function to submit review data to the backend (including user ID retrieval)
async function submitReview(stars, review) {
  const userId = localStorage.getItem('userId'); // Get user ID from local storage
  const url = 'http://localhost:4000/api/review/give-review'; 

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
    body: JSON.stringify({ stars, review, user: userId })
  });

  return await response.json();
};

async function getReviews() {
    const url = 'http://localhost:4000/api/review/get-reviews';
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.success) {
      displayReviews(data.reviews);
    } else {
      console.error('Error fetching reviews:', data.message);
    }
  };

  function displayReviews(reviews) {
    const testimonialContainer = document.querySelector('.owl-carousel'); // Assuming the carousel container
  
    testimonialContainer.innerHTML = ''; // Clear existing content
  
    reviews.forEach(review => {
      const quoteBlock = testimonialContainer.cloneNode(true); // Clone the quote block template
  
      // Update content with review data (stars, text, user information)
      const { stars, review, user: { firstName, lastName } } = review;
  
      quoteBlock.querySelector('h6 q').textContent = review; // Update review text
      quoteBlock.querySelector('.rating').className = `rating rating-${stars}`; // Update star rating class

      quoteBlock.querySelector('.unit-body h6 cite').textContent = `${firstName} ${lastName}`;
  
      // Update user information (optional)
      if (user && user.image) { // Check if user image is available
        quoteBlock.querySelector('.unit-left img').src = user.image; // Update image source
      } else {
        // Handle cases where user image is not available (e.g., placeholder)
      }
  
      testimonialContainer.appendChild(quoteBlock); // Append populated quote block to carousel
    });
  }
  
  // Call the function to fetch reviews on page load
  getReviews();
  
