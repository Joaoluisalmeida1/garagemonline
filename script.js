// Placeholder JavaScript for future interactivity
console.log('Car Marketplace Loaded');
// Timer function for auctions
function startAuctionTimers() {
    const timers = document.querySelectorAll('.auction-timer');
    
    // Check if any timers were found on the page
    if (timers.length === 0) {
        console.log("No auction timers found!");
        return;
    }

    timers.forEach((timer, index) => {
        let timeLeft = parseInt(timer.getAttribute('data-time'), 10);

        if (isNaN(timeLeft)) {
            console.log(`Timer ${index} has an invalid data-time value.`);
            return;
        }

        console.log(`Starting timer ${index} with ${timeLeft} seconds left.`);

        function updateTimer() {
            if (timeLeft > 0) {
                timeLeft--;

                // Calculate hours, minutes, and seconds
                let hours = Math.floor(timeLeft / 3600);
                let minutes = Math.floor((timeLeft % 3600) / 60);
                let seconds = timeLeft % 60;

                // Update the timer text content
                timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timer.textContent = "Expired"; // If time runs out, show "Expired"
                clearInterval(interval); // Stop the timer once it reaches zero
            }
        }

        // Update the timer immediately to avoid a 1-second delay
        updateTimer();

        // Set the interval to update the timer every second
        let interval = setInterval(updateTimer, 1000);
    });
}

// Start the timers when the page loads
window.onload = function() {
    console.log("Page loaded. Initializing auction timers...");
    startAuctionTimers();
};


document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const auctionsGrid = document.querySelector('.auctions-grid');
    const auctionCards = Array.from(document.querySelectorAll('.auction-card'));

    // Attach click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.getAttribute('data-filter');
            sortAuctions(filterType);
        });
    });

    function sortAuctions(filterType) {
        let sortedCards;

        switch (filterType) {
            case 'ending-soon':
                // Sort by time remaining (ascending)
                sortedCards = auctionCards.sort((a, b) => {
                    const timeA = parseInt(a.querySelector('.auction-timer').getAttribute('data-time'), 10);
                    const timeB = parseInt(b.querySelector('.auction-timer').getAttribute('data-time'), 10);
                    return timeA - timeB; // Sort by smallest time first (ending soonest)
                });
                break;

            case 'no-reserve':
                // Sort by no reserve (those with no reserve come first)
                sortedCards = auctionCards.sort((a, b) => {
                    const reserveA = a.getAttribute('data-reserve') === 'true' ? 1 : 0;
                    const reserveB = b.getAttribute('data-reserve') === 'true' ? 1 : 0;
                    return reserveA - reserveB; // No reserve (false) should come first
                });
                break;

            case 'newly-listed':
                // Sort by newly listed (ascending, more recently listed come first)
                sortedCards = auctionCards.sort((a, b) => {
                    const listedA = parseInt(a.getAttribute('data-listed'), 10);
                    const listedB = parseInt(b.getAttribute('data-listed'), 10);
                    return listedA - listedB; // Sort by smaller number of days listed
                });
                break;

            case 'lowest-mileage':
                // Sort by mileage (ascending, lowest mileage first)
                sortedCards = auctionCards.sort((a, b) => {
                    const mileageA = parseInt(a.getAttribute('data-mileage'), 10);
                    const mileageB = parseInt(b.getAttribute('data-mileage'), 10);
                    return mileageA - mileageB; // Sort by lowest mileage first
                });
                break;

            case 'closest-to-me':
                // Sort by location (Lisboa first for this example)
                const userLocation = 'Porto'; // You can dynamically set this based on user location
                sortedCards = auctionCards.sort((a, b) => {
                    const locationA = a.getAttribute('data-location') === userLocation ? 0 : 1;
                    const locationB = b.getAttribute('data-location') === userLocation ? 0 : 1;
                    return locationA - locationB; // Lisboa comes first
                });
                break;

            default:
                // No sorting applied if none of the filter buttons match
                sortedCards = auctionCards;
        }

        // Clear the existing grid and append sorted cards
        auctionsGrid.innerHTML = '';
        sortedCards.forEach(card => auctionsGrid.appendChild(card));
    }
});

// Open modal
function openModal(card) {
    const modal = document.getElementById('carModal');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    
    // Get data from clicked card
    const imageSrc = card.querySelector('img').src;
    const carName = card.querySelector('.car-name').innerText;
    const bid = card.querySelector('.bid-button').innerText;
    const year = card.querySelector('.extra-info p:nth-child(1)').innerText;
    const mileage = card.querySelector('.extra-info p:nth-child(2)').innerText;
    const location = card.querySelector('.extra-info p:nth-child(3)').innerText;
    const reserve = card.querySelector('.reserve-price').innerText;
    
    // Fill modal with data
    modalImage.src = imageSrc;
    modalDetails.innerHTML = `
        <h3>${carName}</h3>
        <p><strong>${bid}</strong></p>
        <p>${year}</p>
        <p>${mileage}</p>
        <p>${location}</p>
        <p>${reserve}</p>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('carModal');
    modal.style.display = 'none';
}



// Kilometers Range Slider (dual handle)
const kmsSlider = document.getElementById('kms-range');
noUiSlider.create(kmsSlider, {
    start: [10000, 100000], // Starting range
    connect: true,
    range: {
        'min': 0,
        'max': 500000
    },
    step: 5000
});
kmsSlider.noUiSlider.on('update', function(values) {
    document.getElementById('kms-output').textContent = `${parseInt(values[0])} km - ${parseInt(values[1])} km`;
});

// Year Range Slider (dual handle)
const yearSlider = document.getElementById('year-range');
noUiSlider.create(yearSlider, {
    start: [2000, 2020],
    connect: true,
    range: {
        'min': 1950,
        'max': 2024
    },
    step: 1
});
yearSlider.noUiSlider.on('update', function(values) {
    document.getElementById('year-output').textContent = `${parseInt(values[0])} - ${parseInt(values[1])}`;
});

// Price Range Slider (dual handle)
const priceSlider = document.getElementById('price-range');
noUiSlider.create(priceSlider, {
    start: [10000, 100000],
    connect: true,
    range: {
        'min': 0,
        'max': 500000
    },
    step: 1000
});
priceSlider.noUiSlider.on('update', function(values) {
    document.getElementById('price-output').textContent = `${parseInt(values[0])}€ - ${parseInt(values[1])}€`;
});

// Placeholder JavaScript for future interactivity
console.log('Car Marketplace Loaded');









// Get modal element and open/close buttons
const modal = document.getElementById('advanced-filters-modal');
const openButton = document.querySelector('.advanced-filters');
const closeButton = document.querySelector('.close-button');

// Open modal
openButton.addEventListener('click', function() {
    modal.style.display = 'flex';
});

// Close modal
closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



// Example car makes, models, and submodels data
const carMakes = [
    "Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Ford", "Toyota", "Honda", 
    "Nissan", "Chevrolet", "Hyundai", "Kia", "Mazda", "Subaru", "Tesla", 
    "Porsche", "Lexus", "Jaguar", "Land Rover", "Volvo", "Mitsubishi", 
    "Peugeot", "Renault", "Ferrari", "Lamborghini", "Bentley", "Rolls-Royce", 
    "Aston Martin", "McLaren", "Bugatti", "Maserati"
];

const carModels = {
    "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLE", "GLC", "GLA", "G-Wagon", "AMG GT"],
    "BMW": ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7", "M3", "M5", "i8", "Z4"],
    "Audi": ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "R8", "TT"],
    "Volkswagen": ["Golf", "Passat", "Tiguan", "Touareg", "Jetta", "Polo", "Arteon", "ID.4"],
    "Ford": ["Fiesta", "Focus", "Mustang", "F-150", "Explorer", "Escape", "Bronco", "Edge", "Fusion"],
    "Toyota": ["Corolla", "Camry", "Prius", "Land Cruiser", "Highlander", "RAV4", "Tacoma", "Hilux", "Supra"],
    "Honda": ["Civic", "Accord", "CR-V", "HR-V", "Pilot", "Fit", "Odyssey", "Ridgeline"],
    "Nissan": ["Altima", "Maxima", "370Z", "GT-R", "Rogue", "Pathfinder", "Murano", "Sentra"],
    "Chevrolet": ["Cruze", "Malibu", "Camaro", "Corvette", "Equinox", "Silverado", "Tahoe", "Suburban", "Blazer"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Veloster", "Kona", "Accent"],
    "Kia": ["Soul", "Seltos", "Sportage", "Sorento", "Stinger", "Telluride", "Rio", "Optima"],
    "Mazda": ["Mazda3", "Mazda6", "CX-3", "CX-5", "CX-9", "MX-5 Miata"],
    "Subaru": ["Impreza", "Outback", "Forester", "Crosstrek", "WRX", "Ascent", "Legacy"],
    "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Roadster"],
    "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Cayman"],
    "Lexus": ["ES", "RX", "NX", "LS", "GX", "LC", "IS", "LX"],
    "Jaguar": ["XE", "XF", "XJ", "F-Pace", "E-Pace", "F-Type", "I-Pace"],
    "Land Rover": ["Range Rover", "Defender", "Discovery", "Evoque", "Velar", "Freelander"],
    "Volvo": ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90"],
    "Mitsubishi": ["Lancer", "Outlander", "Eclipse Cross", "Pajero", "ASX"],
    "Peugeot": ["208", "308", "508", "3008", "5008", "2008"],
    "Renault": ["Clio", "Megane", "Captur", "Kadjar", "Scenic", "Koleos", "Twingo"],
    "Ferrari": ["488", "Roma", "SF90 Stradale", "Portofino", "F8 Tributo", "812 Superfast"],
    "Lamborghini": ["Huracan", "Aventador", "Urus", "Gallardo", "Murcielago"],
    "Bentley": ["Bentayga", "Continental GT", "Flying Spur", "Mulsanne"],
    "Rolls-Royce": ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan"],
    "Aston Martin": ["DB11", "Vantage", "DBS Superleggera", "Rapide", "Vanquish"],
    "McLaren": ["720S", "570S", "600LT", "GT", "P1", "Senna", "Artura"],
    "Bugatti": ["Chiron", "Veyron", "Divo"],
    "Maserati": ["Ghibli", "Levante", "Quattroporte", "GranTurismo"]
};

const carSubmodels = {
    "A-Class": ["A180", "A200", "A250", "AMG A35", "AMG A45"],
    "C-Class": ["C180", "C200", "C300", "C43 AMG", "C63 AMG"],
    "E-Class": ["E200", "E300", "E400", "E450", "E63 AMG"],
    "3 Series": ["318i", "320i", "330i", "M340i", "330e", "M3"],
    "5 Series": ["520i", "530i", "540i", "M550i", "M5"],
    "X5": ["xDrive40i", "xDrive45e", "xDrive50i", "M50i", "M"],
    "A4": ["A4 35 TFSI", "A4 40 TFSI", "A4 45 TFSI", "S4", "RS4"],
    "A6": ["A6 40 TDI", "A6 45 TFSI", "A6 50 TDI", "S6", "RS6"],
    "Golf": ["Golf TSI", "Golf GTI", "Golf R", "Golf GTE"],
    "Passat": ["Passat TDI", "Passat Alltrack", "Passat GTE"],
    "Mustang": ["EcoBoost", "GT", "Shelby GT500"],
    "Civic": ["Civic LX", "Civic EX", "Civic Touring", "Civic Type R"],
    "Accord": ["Accord LX", "Accord EX-L", "Accord Touring"],
    "Camaro": ["LT", "SS", "ZL1"],
    "Corolla": ["Corolla L", "Corolla LE", "Corolla XSE"],
    "Model S": ["Long Range", "Plaid"],
    "Model 3": ["Standard Range", "Long Range", "Performance"],
    "911": ["Carrera", "Carrera S", "Turbo", "Turbo S"],
    "Cayenne": ["Cayenne S", "Cayenne GTS", "Cayenne Turbo", "Cayenne E-Hybrid"],
    "Macan": ["Macan S", "Macan GTS", "Macan Turbo"]
};


// aaa

// For car make (Marca)
const makeInput = document.getElementById('make');
const makeSuggestions = document.getElementById('make-suggestions');

// Model and Submodel inputs
const modelInput = document.getElementById('model');
const modelSuggestions = document.getElementById('model-suggestions');
const submodelInput = document.getElementById('submodel');
const submodelSuggestions = document.getElementById('submodel-suggestions');

// Reset fields when Marca is changed
makeInput.addEventListener('change', function() {
    modelInput.value = ''; // Clear Model field
    submodelInput.value = ''; // Clear Submodel field
    modelSuggestions.innerHTML = ''; // Clear suggestions for Model
    submodelSuggestions.innerHTML = ''; // Clear suggestions for Submodel

    // Populate Model field based on Marca
    const selectedMake = makeInput.value;
    const models = carModels[selectedMake] || [];

    // Enable Model input only if there are models available for the selected Marca
    if (models.length > 0) {
        modelInput.disabled = false;
    } else {
        modelInput.disabled = true;
    }

    // Disable Submodel input (since no Model is selected yet)
    submodelInput.disabled = true;
});

// Function to show suggestions (for both Make, Model, and Submodel)
function showSuggestions(filteredItems, suggestionElement, inputElement) {
    suggestionElement.innerHTML = ''; // Clear previous suggestions

    if (filteredItems.length > 0) {
        suggestionElement.classList.add('show'); // Show suggestions list
        filteredItems.forEach(item => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = item;
            suggestionItem.classList.add('suggestion-item');
            suggestionElement.appendChild(suggestionItem);

            // Set the input value when a suggestion is clicked
            suggestionItem.addEventListener('click', function() {
                inputElement.value = item;
                suggestionElement.innerHTML = ''; // Clear suggestions after selection
                suggestionElement.classList.remove('show'); // Hide suggestions after selection

                // If Marca is selected, enable the Model field
                if (inputElement === makeInput) {
                    modelInput.disabled = false;
                    submodelInput.disabled = true; // Submodel stays disabled
                }
                
                // If Model is selected, enable the Submodel field
                if (inputElement === modelInput) {
                    const selectedModel = modelInput.value;
                    const submodels = carSubmodels[selectedModel] || [];

                    if (submodels.length > 0) {
                        submodelInput.disabled = false;
                    } else {
                        submodelInput.disabled = true;
                    }
                }
            });
        });
    } else {
        suggestionElement.classList.remove('show'); // Hide list if no suggestions
    }
}

// For car make (Marca) suggestions
makeInput.addEventListener('focus', function() {
    showSuggestions(carMakes, makeSuggestions, makeInput);
});
makeInput.addEventListener('input', function() {
    showSuggestions(carMakes.filter(make => make.toLowerCase().includes(makeInput.value.toLowerCase())), makeSuggestions, makeInput);
});

// For car model (Model) suggestions
modelInput.addEventListener('focus', function() {
    const selectedMake = makeInput.value;
    const models = carModels[selectedMake] || [];
    showSuggestions(models, modelSuggestions, modelInput);
});
modelInput.addEventListener('input', function() {
    const selectedMake = makeInput.value;
    const models = carModels[selectedMake] || [];
    showSuggestions(models.filter(model => model.toLowerCase().includes(modelInput.value.toLowerCase())), modelSuggestions, modelInput);
});

// For car submodel (Submodel) suggestions
submodelInput.addEventListener('focus', function() {
    const selectedModel = modelInput.value;
    const submodels = carSubmodels[selectedModel] || [];
    showSuggestions(submodels, submodelSuggestions, submodelInput);
});
submodelInput.addEventListener('input', function() {
    const selectedModel = modelInput.value;
    const submodels = carSubmodels[selectedModel] || [];
    showSuggestions(submodels.filter(submodel => submodel.toLowerCase().includes(submodelInput.value.toLowerCase())), submodelSuggestions, submodelInput);
});




// CONTENT BOXES


const categories = {
    classics: ['images/classics1.jpg', 'images/classics2.jpg', 'images/classics3.jpg'],
    suvs: ['images/suvs1.jpg', 'images/suvs2.jpg', 'images/suvs3.jpg'],
    economical: ['images/economical1.jpg', 'images/economical2.jpg', 'images/economical3.jpg'],
    electric: ['images/electric1.png', 'images/electric2.jpg', 'images/electric3.jpg'],
    hybrid: ['images/hybrid1.jpg', 'images/hybrid2.jpg', 'images/hybrid3.jpg'],
    luxury: ['images/luxury1.jpg', 'images/luxury2.jpg', 'images/luxury3.png'],
    convertibles: ['images/convertibles1.jpg', 'images/convertibles2.jpg', 'images/convertibles3.jpg'],
    pickups: ['images/pickups1.jpg', 'images/pickups2.jpg', 'images/pickups3.jpg'],
    sports: ['images/sports1.jpg', 'images/sports2.jpg', 'images/sports3.jpg'],
    offroad: ['images/offroad1.jpg', 'images/offroad2.jpg', 'images/offroad3.jpg'],
    compact: ['images/compact1.png', 'images/compact2.jpg', 'images/compact3.jpg'],
    vans: ['images/vans1.jpg', 'images/vans2.png', 'images/vans3.jpg']
};

// Function to set the initial image and start rotating the background images
const changeBackground = (category, images) => {
    let currentIndex = 0;
    const element = document.querySelector(`.${category}`);

    // Set the initial image immediately
    element.style.backgroundImage = `url(${images[currentIndex]})`;

    // Start rotating the images every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        element.style.backgroundImage = `url(${images[currentIndex]})`;
    }, 5000); // Change image every 5 seconds
};

// Apply this to each category
for (const category in categories) {
    changeBackground(category, categories[category]);
}

function preloadImages(imageUrls) {
    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

// Call this with the image URLs you want to preload
preloadImages([
    'images/classics.jpg',
    'images/suvs.jpg',
    'images/economical.jpg',
    // Add all your images here...
]);





// FORUM


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'Geral';

    // Update the page title and heading based on the category
    document.getElementById('category-title').textContent = category;

    // Mock posts data (can be fetched from a server or an API)
    const postsData = {
        'Geral': [
            { title: 'Bem-vindo ao Fórum Geral', author: 'Admin', comments: 10 },
            { title: 'Sugestões para melhorar o fórum', author: 'Utilizador1', comments: 5 }
        ],
        'Carros Antigos': [
            { title: 'Qual o melhor clássico para investir?', author: 'Utilizador2', comments: 7 },
            { title: 'Exposição de carros antigos em Lisboa', author: 'Utilizador3', comments: 12 }
        ],
        // Add more categories and posts here
    };

    // Get the container where posts will be added
    const postsContainer = document.getElementById('posts-container');

    // Load the posts for the selected category
    const posts = postsData[category] || [];
    posts.forEach(post => {
        const postHTML = `
            <div class="post">
                <div class="voting">
                    <button class="upvote">▲</button>
                    <span class="votes">0</span>
                    <button class="downvote">▼</button>
                </div>
                <div class="post-details">
                    <h2 class="post-title"><a href="post-page.html">${post.title}</a></h2>
                    <p class="post-meta">Publicado por <strong>${post.author}</strong></p>
                    <a href="post-page.html" class="comment-link">${post.comments} comentários</a>
                </div>
            </div>
        `;
        postsContainer.innerHTML += postHTML;
    });
});


// Toggle favorite status
document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});



// Image slider for car ad pages


function changeImage(src) {
    document.getElementById('main-image').src = src;
}







