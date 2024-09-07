// Placeholder JavaScript for future interactivity
console.log('Car Marketplace Loaded');


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
    document.getElementById('kms-output').textContent = `${parseInt(values[0])} - ${parseInt(values[1])}`;
});

// Year Range Slider (dual handle)
const yearSlider = document.getElementById('year-range');
noUiSlider.create(yearSlider, {
    start: [2010, 2015],
    connect: true,
    range: {
        'min': 1980,
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
    start: [10000, 50000],
    connect: true,
    range: {
        'min': 0,
        'max': 100000
    },
    step: 1000
});
priceSlider.noUiSlider.on('update', function(values) {
    document.getElementById('price-output').textContent = `${parseInt(values[0])} - ${parseInt(values[1])}`;
});

// Placeholder JavaScript for future interactivity
console.log('Car Marketplace Loaded');

// Example car makes, models, and submodels data
const carMakes = ["Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Ford"];
const carModels = {
    "Mercedes-Benz": ["A-Class", "C-Class", "E-Class"],
    "BMW": ["3 Series", "5 Series", "X5"],
    "Audi": ["A4", "A6", "Q5"]
};
const carSubmodels = {
    "A-Class": ["A180", "A200", "A250"],
    "3 Series": ["320i", "330i", "340i"]
};

// Suggestion for car make (Marca)
const makeInput = document.getElementById('make');
const makeSuggestions = document.getElementById('make-suggestions');

makeInput.addEventListener('input', function() {
    const inputValue = makeInput.value.toLowerCase();
    makeSuggestions.innerHTML = ''; // Clear previous suggestions

    // Filter suggestions
    const filteredMakes = carMakes.filter(make => make.toLowerCase().includes(inputValue));

    if (filteredMakes.length === 0) {
        makeSuggestions.classList.remove('show'); // Hide if no suggestions
    } else {
        makeSuggestions.classList.add('show'); // Show the list if there are suggestions
        filteredMakes.forEach(make => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = make;
            suggestionItem.classList.add('suggestion-item');
            makeSuggestions.appendChild(suggestionItem);

            suggestionItem.addEventListener('click', () => {
                makeInput.value = make;
                makeSuggestions.innerHTML = ''; // Clear suggestions after selection
                makeSuggestions.classList.remove('show'); // Hide suggestions after selection
            });
        });
    }
});

// Same approach for models and submodels
const modelInput = document.getElementById('model');
const modelSuggestions = document.getElementById('model-suggestions');

makeInput.addEventListener('change', function() {
    const selectedMake = makeInput.value;
    const filteredModels = carModels[selectedMake] || [];

    modelInput.addEventListener('input', function() {
        const inputValue = modelInput.value.toLowerCase();
        modelSuggestions.innerHTML = ''; // Clear previous suggestions

        if (filteredModels.length === 0 || !inputValue) {
            modelSuggestions.classList.remove('show'); // Hide if no suggestions
        } else {
            modelSuggestions.classList.add('show'); // Show suggestions
            filteredModels.filter(model => model.toLowerCase().includes(inputValue))
                .forEach(model => {
                    const suggestionItem = document.createElement('li');
                    suggestionItem.textContent = model;
                    suggestionItem.classList.add('suggestion-item');
                    modelSuggestions.appendChild(suggestionItem);

                    suggestionItem.addEventListener('click', () => {
                        modelInput.value = model;
                        modelSuggestions.innerHTML = ''; // Clear after selection
                        modelSuggestions.classList.remove('show'); // Hide list
                    });
                });
        }
    });
});

// Handle submodels similarly
const submodelInput = document.getElementById('submodel');
const submodelSuggestions = document.getElementById('submodel-suggestions');

modelInput.addEventListener('change', function() {
    const selectedModel = modelInput.value;
    const filteredSubmodels = carSubmodels[selectedModel] || [];

    submodelInput.addEventListener('input', function() {
        const inputValue = submodelInput.value.toLowerCase();
        submodelSuggestions.innerHTML = ''; // Clear previous suggestions

        if (filteredSubmodels.length === 0 || !inputValue) {
            submodelSuggestions.classList.remove('show'); // Hide if no suggestions
        } else {
            submodelSuggestions.classList.add('show'); // Show suggestions
            filteredSubmodels.filter(submodel => submodel.toLowerCase().includes(inputValue))
                .forEach(submodel => {
                    const suggestionItem = document.createElement('li');
                    suggestionItem.textContent = submodel;
                    suggestionItem.classList.add('suggestion-item');
                    submodelSuggestions.appendChild(suggestionItem);

                    suggestionItem.addEventListener('click', () => {
                        submodelInput.value = submodel;
                        submodelSuggestions.innerHTML = ''; // Clear after selection
                        submodelSuggestions.classList.remove('show'); // Hide list
                    });
                });
        }
    });
});
