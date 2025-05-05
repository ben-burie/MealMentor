var groceries = JSON.parse(localStorage.getItem("groceries")) || [];
var recipes = JSON.parse(localStorage.getItem("recipes")) || [];

const recipeForm = document.getElementById("recipe-select");
const recipeDropdown = document.getElementById("recipes-dropdown");
const addRecipeButton = document.getElementById("submit-recipe");
const groceryClearButton = document.getElementById("clear-groceries");
const recipeClearButton = document.getElementById("clear-recipes");

window.addEventListener("load", populateRecipeOptions);
window.addEventListener("load", populateGroceries);
window.addEventListener("load", populateRecipes);
addRecipeButton.addEventListener("click", addRecipe);
groceryClearButton.addEventListener("click", () => clear("groceries", "grocery-table"));
recipeClearButton.addEventListener("click", () => clear("recipes", "recipe-table"));


function populateRecipeOptions() { //fills the recipe dropdown with all 3000 recipes from the recipe_database JSON file
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

function addRecipe(e) { //adds the selected recipe to the recipe plan table when the user clicks the "add" button
    e.preventDefault();

    const table = document.getElementById("recipe-table");

    let selectedRecipe = recipeDropdown.value;

    if (selectedRecipe === "Select a recipe") {
        return;
    }

    const recipeNames = recipes.map(recipes => recipes[0]); 
    if (!uniqueItem(recipeNames, selectedRecipe)) { //make sure recipe is not already added
        alert(selectedRecipe + " is already in your planned recipes table!");
        recipeDropdown.value = "Select a recipe"
        return;
    }

    //add recipe to table
    const newRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.innerHTML = selectedRecipe;
    newRow.appendChild(nameCell);
    table.appendChild(newRow);

    //search json file for the corresponding link
    const foundRecipe = recipeData.find(recipe => recipe.name === selectedRecipe);

    if (foundRecipe) {
        const linkCell = document.createElement("td");
        linkCell.innerHTML = "<a href='https://" + foundRecipe.link + "' target='_blank'>Link</a>";
        newRow.appendChild(linkCell);
        currentRecipe = [foundRecipe.name, foundRecipe.link];
        recipes.push(currentRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        refreshGroceries(foundRecipe.ingredients, kitchen);
    }

    recipeDropdown.value = "Select a recipe";
}

function populateRecipes() { //adds teh recipe to the recipe table along with its link
    const table = document.getElementById("recipe-table");
    for (let i=0; i<recipes.length; i++) {
        const newRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        const linkCell = document.createElement("td");
        nameCell.innerHTML = recipes[i][0];
        linkCell.innerHTML = "<a href='https://" + recipes[i][1] + "' target='_blank'>Link</a>";
        
        newRow.appendChild(nameCell);
        newRow.appendChild(linkCell);
        table.appendChild(newRow);
        newRow.addEventListener("click", () => {
            if (confirm("Delete " + newCell.textContent + "?") == true) {
                newRow.remove();
                removeItemFromArray(newCell.textContent, recipes, "recipes");
            }
        });
    } 
}

function refreshGroceries(ingredients, kitchen) { //adds items to grocery list based on planned recipes
    groceriesToAdd = [];
    for (let i=0; i<ingredients.length; i++) {
        if (!kitchen.includes(ingredients[i])) {
            groceriesToAdd.push(ingredients[i]);
        }
    }
    console.log(groceriesToAdd);
    for (let i=0; i<groceriesToAdd.length; i++) {
        addGroceryItem(groceriesToAdd[i]);
    }
}

function addGroceryItem(item) { //adds the grocery item to the grocery table in the HTML

    const table = document.getElementById("grocery-table");
    const input = document.getElementById("item-add-kitchen");
    const currItem = item;

    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");
    newCell.innerHTML = currItem;

    newRow.appendChild(newCell);
    table.appendChild(newRow);

    groceries.push(newCell.textContent);
    localStorage.setItem("groceries", JSON.stringify(groceries));

    newRow.addEventListener("click", () => {
        if (confirm("Delete " + newCell.textContent + "?") == true) {
            newRow.remove();
            removeItemFromArray(newCell.textContent, groceries, "groceries");
        }
    });

    input.value = "";
}

function populateGroceries() { //fills grocery with items stored in array.....CAN SIMPLIFY THIS FUNCTION WITH KITCHEN FUNCTION LATER
    const table = document.getElementById("grocery-table");
    for (let i=0; i<groceries.length; i++) {
        const newRow = document.createElement("tr");
        const newCell = document.createElement("td");
        newCell.innerHTML = groceries[i];
        
        newRow.appendChild(newCell);
        table.appendChild(newRow);
        newRow.addEventListener("click", () => {
            if (confirm("Delete " + newCell.textContent + "?") == true) {
                newRow.remove();
                removeItemFromArray(newCell.textContent, groceries, "groceries");
            }
        });
    } 
}

function removeItemFromArray(requestedItem, list, title) { //removes requested item from requested array
    for (let i=0; i<list.length; i++) {
        if (list[i] === requestedItem) {
            list.splice(i, 1);
            localStorage.setItem(title, JSON.stringify(list));
        }
    }
}

function clear(title, tableTitle) { //clears table contents from local memory
    if (localStorage.getItem(title) == null) {
        alert("Your " + title + " list is already empty!");
        return;
    }
    if (confirm("Are you sure you want to clear your " + title + " list?") == true) {
        localStorage.removeItem(title);
        const table = document.getElementById(tableTitle);
        if (tableTitle === "recipe-table") {
            table.innerHTML = "<th style='width: 70%;'>Item</th><th style='width: 30%;'>Link</th>";
        }
        else {
            table.innerHTML = "<th>Item</th>";
        }
    }
}

function uniqueItem(array, item) { //checks array to see if ingredient/recipe/grocery item is already there
    if (array.includes(item)) {
        return false; //item already exists
    }
    else {
        return true; //item does not already exist, so it can be added
    }
}