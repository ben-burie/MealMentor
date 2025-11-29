# Meal Mentor 🥗  
*A JavaScript meal-planning app to simplify weekly cooking and grocery shopping.*

Meal Mentor helps users plan recipes, track kitchen inventory, automatically generate grocery lists, and discover meals they can cook with what they already have.

---

## ⭐ Features

### **Kitchen Inventory**
- Add or remove ingredients you currently have.
- Data is saved automatically using **localStorage**.

### **Recipe Planner**
- Choose from **3,000+ recipes** stored in a JSON dataset.
- Selected recipes are added to your weekly plan.
- Missing ingredients are automatically added to your **grocery list**.

### **Grocery List**
- Fully auto-generated based on your recipe plan.
- Updates whenever you add or remove planned recipes.

### **Recipe Suggestions**
- Shows recipes you can make **using only ingredients already in your kitchen**.
- Includes a dynamic ingredient filter to hide specific recipes.

### **PDF Export**
- Download a printable PDF containing your weekly plan and grocery list (via **jsPDF**).

---

## 🛠️ Tech Stack

- **JavaScript**, **HTML5**, **CSS**
- **LocalStorage API** for persistence  
- **jQuery** for dropdown filtering  
- **jsPDF** for PDF generation  
- **3,000-recipe JSON dataset** (cleaned via Python from a Kaggle CSV)

---

## 📁 Project Structure

```bash
meal-mentor/
├── index.html
├── planner.html
├── suggestions.html
├── styles/
│   └── styles.css
├── scripts/
│   ├── kitchen.js
│   ├── popup.js
│   ├── recipeSearch.js
│   └── suggestions.js
│   └── summary.js
└── data/
    └── recipe_database.json
```

---

## 📚 Summary
Meal Mentor is a lightweight, browser-based application designed to streamline meal prep by combining recipe planning, inventory management, and smart grocery list generation. It demonstrates full use of DOM manipulation, event handling, data persistence, and multi-page UI structuring in JavaScript.
