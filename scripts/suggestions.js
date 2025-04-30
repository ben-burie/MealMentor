const refreshButton = document.getElementById("refresh");

refreshButton.addEventListener("click", refreshSuggestions);

function refreshSuggestions() {
    if (kitchen.length == 0) {
        alert("No recipes available, there are not enough groceries in your kitchen.");
    }
    else {
        findAvailableRecipes();
    }
}

function findAvailableRecipes() {
    fetch("data/recipe_database.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {
            let ingredients = data.ingredients;
            let length = ingredients.length;
            let isValid = false;
            for (i=0; i<length; i++) {
                if (!kitchen.includes(ingredients[i])) {
                    isValid = false;
                    break;
                }
                else {
                    isValid = true;
                }
            }
            if (isValid == true) {
                console.log(data.name); //currently logging all recipes that can be made with available ingredients
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
}