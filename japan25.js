document.addEventListener("DOMContentLoaded", function () {
    let worksData = [];

    function adjustMaxWidth() {
        const imgs = document.querySelectorAll('#container-id img');

        imgs.forEach(img => {
            if (window.innerWidth <= 600) {
                img.style.width = 'auto';
                img.style.maxWidth = '90%';
                img.style.margin = '5%'
            } else {
                img.style.width = '500px';
                img.style.maxWidth = '';
            }
        });
    }

    // Fetch JSON data
    fetch('works.json')
        .then(response => response.json())
        .then(data => {
            worksData = data.japan2025;
            renderProducts(worksData);
            adjustMaxWidth();
        });

    function renderProducts(artworks) {
        const productCardsContainer = document.getElementById('container-id');  // Target the main container
        productCardsContainer.innerHTML = ''; // Clear existing products

        const worksContainer = document.createElement('div');
        worksContainer.classList.add('works-container');
        worksContainer.style.display = 'flex';  // Make sure it’s visible
        productCardsContainer.appendChild(worksContainer);

        let column = null;  // Temporary variable to hold the current column

        // Loop through each artwork and create a new column after every 3 items
        artworks.forEach((artwork, index) => {
            // Create a new column after every 3 images
            if (index % 5 === 0) {
                column = document.createElement('div');
                column.classList.add('works-column');
                worksContainer.appendChild(column);
            }

            // Create the image container
            const newImgContainer = document.createElement('div');
            newImgContainer.classList.add('works-img');

            const newImg = document.createElement('img');
            newImg.src = artwork.image_url;
            newImg.alt = artwork.name; // Optional: Add alt text for accessibility
            newImg.width = 500;  // Set width as per your example

            // Add click event to each image to enlarge it
            newImg.addEventListener('click', function() {
                enlargeImage(artwork.image_url, artwork.filter_type, artwork.material, artwork.name, artwork.size, artwork.date);  // Trigger enlarging of image
            });

            newImgContainer.appendChild(newImg);
            column.appendChild(newImgContainer);
        });
    }

    // Function to show the enlarged image with a fade-in effect and display filter type
    function enlargeImage(imageUrl, filterType, materialType, nameType, sizeType, dateType) {
        const overlay = document.getElementById('overlay');
        const enlargedImage = document.getElementById('enlarged-image');
        //const filterText = document.getElementById('image-filter-type');  // The text element for filter_type
        const materialText = document.getElementById('image-material');
        const nameText = document.getElementById('image-name');
        const sizeText = document.getElementById('image-size');
        const dateText = document.getElementById('image-date');

        enlargedImage.src = imageUrl;
        //filterText.textContent = `${filterType}`;  // Set the filter type text
        materialText.textContent = `${materialType}`;  
        nameText.textContent = `${nameType}`;

        sizeText.textContent = `${sizeType}`;
        dateText.textContent = `${dateType}`;
        
        overlay.classList.add('show');  // Add the 'show' class to make the overlay visible
    }

    // Close the enlarged image view when clicking on the close button
    document.getElementById('close-overlay').addEventListener('click', function() {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('show');  // Remove the 'show' class to hide the overlay
    });

    // Close the enlarged image view when clicking anywhere outside the image
    document.getElementById('overlay').addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.remove('show');  // Remove the 'show' class to hide the overlay
        }
    });
});
