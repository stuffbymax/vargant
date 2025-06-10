  const output_div = document.getElementById("output");
  const image_div = document.getElementById("photo");

  const api_url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2024-01-01&api_key=clGt9tyVI795AnHmEfubi89fAkDwW4tl5s0bLehV";

  let photos = [];
  let currentIndex = 0;

  async function getData() {
    try {
      const response = await fetch(api_url);
      const json_data = await response.json();
      photos = json_data.photos;

      console.log(`Total photos: ${photos.length}`);

      if (photos.length > 0) {
        displayPhoto(currentIndex);
      } else {
        output_div.innerText = "No photos found for this date.";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      output_div.innerText = "Error loading data.";
    }
  }

  function displayPhoto(index) {
    image_div.innerHTML = ""; // Clear existing image
    const img = document.createElement("img");
    img.src = photos[index].img_src;
    img.alt = "Mars photo";
    img.style.maxWidth = "400px";
    image_div.appendChild(img);

    output_div.innerText = `Photo ${index + 2} of ${photos.length}\nRover: ${photos[index].rover.name}, Camera: ${photos[index].camera.full_name}`;
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (photos.length === 0) return;
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    displayPhoto(currentIndex);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (photos.length === 0) return;
    currentIndex = (currentIndex + 1) % photos.length;
    displayPhoto(currentIndex);
  });

  getData();
