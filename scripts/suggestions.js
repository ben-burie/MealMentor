const refreshButton = document.getElementById("refresh");
const suggestedRecipes = [];

refreshButton.addEventListener("click", refreshSuggestions);
window.addEventListener("load", refreshSuggestions);

function refreshSuggestions() { //refreshes the suggested recipes table which is based on available ingredients from the user's kitchen
    if (kitchen.length == 0) {
        alert("No recipes available, there are not enough groceries in your kitchen.");
    }
    else {
        findAvailableRecipes();
    }
}

function findAvailableRecipes() { //finds recipes that contain only ingredients that also exist in the user's kitchen
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
                suggestedRecipes.push(data.name);
                addAvailableRecipe(data.name, data.ingredients, data.link);
                populateFilterList(data.ingredients)
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function addAvailableRecipe(name, ingredients, link) { //adds the found recipe to the suggested recipes table
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

function populateFilterList(ingredient) { //populates the filter dropdown with all ingredients from recipes in the suggested recipes table
    for (let i=0; i<ingredient.length; i++) {
        const filterDropdown = document.getElementById("filter-options");
        let ingredientEle = document.createElement("option");
        ingredientEle.textContent = ingredient[i];
        filterDropdown.appendChild(ingredientEle);
    }
}

$(function() { //use jQuery to detect a change in the dropdown, then filter recipe results
    $("#filter-options").change(function() {
        console.log("Change");
        const filterItem = document.getElementById("filter-options").value;

        const allRows = document.getElementById("suggestion-table").children;
        for (let row of allRows) {
            row.style.display = ""; // restore visibility of recipes once the filter item is changed
        }

        for (let i=0; i<suggestedRecipes.length; i++) {
            fetch("data/recipe_database.json")
            .then(response => response.json())
            .then(data => {
                data.forEach(data => {
                    if (data.name === suggestedRecipes[i]) {
                        if (data.ingredients.includes(filterItem)) {
                            const parentEle = document.getElementById("suggestion-table");
                            const children = parentEle.children;

                            for (let child of children) {
                                const cells = child.getElementsByTagName("td");
                                for (let cell of cells) {
                                  if (cell.textContent.trim() === data.name) {
                                    const target = child;
                                    target.style.display = "none"; //hide recipes that contain filtered ingredients
                                  }
                                }
                            }
                        }
                    }
            });
            })
            .catch(error => console.error('Error loading JSON:', error));
        }
    });
});