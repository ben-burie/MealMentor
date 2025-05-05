const downloadButton = document.getElementById("download");
const currentDate = new Date();
const date = currentDate.toLocaleDateString();

downloadButton.addEventListener("click", generatePdf);

async function generatePdf() {
    const userName = document.getElementById("name").value;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(("Meal Plan For " + userName + " on " + date), 60, 10);

    let line = 20
    doc.text("GROCERY LIST:", 10, line);
    for (let i=0; i<groceries.length; i++) {
        line += 8;
        doc.text(groceries[i], 10, line);
    }

    line = 20;
    doc.text("RECIPES PLANNED:", 118, line);
    line = 30;
    for (let i=0; i<recipes.length; i++) {
        doc.text(recipes[i], 118, line);
        line += 20;
    }

    doc.save("grocery-list.pdf");
}