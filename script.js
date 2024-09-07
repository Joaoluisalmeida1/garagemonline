// Placeholder JavaScript for future interactivity
console.log('Car Marketplace Loaded');

const carModels = ["Mercedes-Benz A-Class", "Mercedes-Benz C-Class", "Mercedes-Benz E-Class", "BMW 3 Series", "BMW 5 Series", "Audi A4", "Audi A6"];

const searchInput = document.getElementById('model');
const suggestionsList = document.getElementById('suggestions-list');

searchInput.addEventListener('input', function() {
    const inputValue = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = ''; // Clear the previous suggestions

    if (inputValue) {
        const filteredModels = carModels.filter(model => model.toLowerCase().includes(inputValue));
        filteredModels.forEach(model => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = model;
            suggestionItem.classList.add('suggestion-item');
            suggestionsList.appendChild(suggestionItem);

            // Click event to fill the input with the selected suggestion
            suggestionItem.addEventListener('click', () => {
                searchInput.value = model;
                suggestionsList.innerHTML = ''; // Clear suggestions after selection
            });
        });
    }
});
