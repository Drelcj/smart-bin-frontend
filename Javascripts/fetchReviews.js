async function getReviews() {
    const url = '/get-reviews';
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.success) {
      displayReviews(data.reviews);
    } else {
      console.error('Error fetching reviews:', data.message);
    }
  }
  