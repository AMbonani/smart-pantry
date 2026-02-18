document.addEventListener("DOMContentLoaded", () => {

    console.log("JS Loaded!"); // Confirm JS runs

    const pantry = [];

    const input = document.getElementById("ingredient-input");
    const addBtn = document.getElementById("add-btn");
    const pantryList = document.getElementById("pantry-list");
    const searchBtn = document.getElementById("search-recipes-btn");
    const recipeResults = document.getElementById("recipe-results");

    // Render pantry list
    function renderPantry() {
        pantryList.innerHTML = pantry
            .map((item, index) => `
                <li>
                    ${item}
                    <button onclick="removeIngredient(${index})">❌</button>
                </li>
            `).join("");
    }

    // Remove ingredient
    window.removeIngredient = function(index) {
        pantry.splice(index, 1);
        renderPantry();
    }

    // Add ingredient
    addBtn.addEventListener("click", () => {
        const value = input.value.trim();
        if (value !== "") {
            pantry.push(value);
            input.value = "";
            renderPantry();
        }
    });

    // Add ingredient on Enter key
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });

    // Show recipes (mock data with picsum.photos images)
    searchBtn.addEventListener("click", () => {
        if (pantry.length === 0) {
            alert("Please add ingredients first.");
            return;
        }

        const mockRecipes = [
            {
                title: "Garlic Chicken Bowl",
                image: "https://picsum.photos/400/250?random=1"
            },
            {
                title: "Fresh Garden Salad",
                image: "https://picsum.photos/400/250?random=2"
            },
            {
                title: "Pasta Primavera",
                image: "https://picsum.photos/400/250?random=3"
            }
        ];

        recipeResults.innerHTML = mockRecipes.map(recipe => `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            </div>
        `).join("");
    });

});

