var groceries = JSON.parse(localStorage.getItem("groceries")) || [];

const recipeForm = document.getElementById("recipe-select");
const recipeDropdown = document.getElementById("recipes-dropdown");
const addRecipeButton = document.getElementById("submit-recipe");
const groceryClearButton = document.getElementById("clear-groceries");

window.addEventListener("load", populateRecipeOptions);
window.addEventListener("load", populateGroceries);
addRecipeButton.addEventListener("click", addRecipe);
groceryClearButton.addEventListener("click", clearGroceries);

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
        refreshGroceries(foundRecipe.ingredients, kitchen);
    }

    recipeDropdown.value = "Select a recipe";
}

function refreshGroceries(ingredients, kitchen) {
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

function addGroceryItem(item) {
    //e.preventDefault();

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
            removeItemFromArray(newCell.textContent);
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
                removeItemFromArray(newCell.textContent);
            }
        });
    } 
}

function removeItemFromArray(requestedItem) { //removes item from kitchen array......CAN SIMPLIFY THIS FUNCTION WITH KITCHEN FUNCTION LATER
    for (let i=0; i<groceries.length; i++) {
        if (groceries[i] === requestedItem) {
            groceries.splice(i, 1);
            localStorage.setItem("groceries", JSON.stringify(groceries));
        }
    }
}

function clearGroceries() { //clears the kitchens contents from the display and local memory......CAN SIMPLIFY THIS FUNCTION WITH KITCHEN FUNCTION LATER
    if (confirm("Are you sure you want to clear your grocery list?") == true) {
        localStorage.removeItem("groceries");
        const table = document.getElementById("grocery-table");
        table.innerHTML = "<th>Item</th>";
    }
}