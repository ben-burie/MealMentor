const recipeForm = document.getElementById("recipe-select");
const recipeDropdown = document.getElementById("recipes-dropdown");
const addRecipeButton = document.getElementById("submit-recipe");

window.addEventListener("load", populateRecipeOptions);
addRecipeButton.addEventListener("click", addRecipe);

function populateRecipeOptions() {
    fetch("data/recipe_database.json")
    .then(response => response.json())
    .then(data => {
        recipeData = data;
        const names = data.map(recipe => recipe.name);
        
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Select a recipe";
        recipeDropdown.appendChild(defaultOption);

        names.forEach(name => {
            const option = document.createElement("option");
            option.textContent = name;
            recipeDropdown.appendChild(option);
        });

    })
    .catch(error => console.error("Error loading JSON: ", error));
}

function addRecipe(e) {
    e.preventDefault();

    const table = document.getElementById("recipe-table");

    let selectedRecipe = recipeDropdown.value;

    //add recipe to table
    const newRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.innerHTML = selectedRecipe;
    newRow.appendChild(nameCell);
    table.appendChild(newRow);

    //search json file for the corresponding link
    const foundRecipe = recipeData.find(recipe => recipe.name === selectedRecipe);

    if (foundRecipe) {
        console.log("Ing: ", foundRecipe.ingredients);
        console.log("Link: ", foundRecipe.link);

        const linkCell = document.createElement("td");
        linkCell.innerHTML = "<a href='https://" + foundRecipe.link + "' target='_blank'>Link</a>";
        newRow.appendChild(linkCell);
    }

    recipeDropdown.value = "Select a recipe";
}