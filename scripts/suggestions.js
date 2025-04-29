const refreshButton = document.getElementById("refresh");

refreshButton.addEventListener("click", refreshSuggestions);

function refreshSuggestions() {
    if (kitchen.length == 0) {
        alert("No recipes available, there are not enough groceries in your kitchen.");
    }
}