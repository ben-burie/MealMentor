var kitchen = JSON.parse(localStorage.getItem("kitchen")) || [];

const table = document.getElementById("kitchen-table");
const addButton = document.getElementById("button-add-kitchen");
const clearButton = document.getElementById("clear-kitchen");

addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", () => clear("kitchen", "kitchen-table"));
window.addEventListener("load", populateKitchen);

function addItem(e) { //adds item to kitchen and kithen array
    e.preventDefault();

    const input = document.getElementById("item-add-kitchen");
    const currItem = input.value;

    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");
    newCell.innerHTML = currItem;

    newRow.appendChild(newCell);
    table.appendChild(newRow);

    kitchen.push(newCell.textContent);
    localStorage.setItem("kitchen", JSON.stringify(kitchen));

    newRow.addEventListener("click", () => {
        if (confirm("Delete " + newCell.textContent + "?") == true) {
            newRow.remove();
            removeItemFromArray(newCell.textContent, kitchen, "kitchen");
        }
    });

    input.value = "";
}

function populateKitchen() { //fills kitchen with items stored in array
    for (let i=0; i<kitchen.length; i++) {
        const newRow = document.createElement("tr");
        const newCell = document.createElement("td");
        newCell.innerHTML = kitchen[i];
        
        newRow.appendChild(newCell);
        table.appendChild(newRow);
        newRow.addEventListener("click", () => {
            if (confirm("Delete " + newCell.textContent + "?") == true) {
                newRow.remove();
                removeItemFromArray(newCell.textContent, kitchen, "kitchen");
            }
        });
    } 
}