const refreshButton = document.getElementById("refresh");
const suggestedRecipes = [];

refreshButton.addEventListener("click", refreshSuggestions);
window.addEventListener("load", refreshSuggestions);

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
            if (isValid === true && !suggestedRecipes.includes(data.name)) {
                console.log(data.name); //currently logging all recipes that can be made with available ingredients
                suggestedRecipes.push(data.name);
                addAvailableRecipe(data.name, data.ingredients, data.link);
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function addAvailableRecipe(name, ingredients, link) {
    const suggestionTable = document.getElementById("suggestion-table");
    const newRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const ingredientCell = document.createElement("td");
    const linkCell = document.createElement("td");

    nameCell.innerHTML = name;
    ingredientCell.innerHTML = ingredients;
    linkCell.innerHTML = "<a href='https://" + link + "' target='_blank'>Link</a>";
    
    newRow.appendChild(nameCell);
    newRow.appendChild(ingredientCell);
    newRow.appendChild(linkCell);

    suggestionTable.appendChild(newRow);
}