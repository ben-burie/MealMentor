const image = document.querySelector(".learn-more");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-button");

image.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);

function showPopup() {
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
}