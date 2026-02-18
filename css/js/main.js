document.addEventListener("DOMContentLoaded", () => {

    const pantry = [];

    const input = document.getElementById("ingredient-input");
    const addBtn = document.getElementById("add-btn");
    const pantryList = document.getElementById("pantry-list");
    const searchBtn = document.getElementById("search-recipes-btn");
    const recipeResults = document.getElementById("recipe-results");

    function renderPantry() {
        pantryList.innerHTML = pantry
            .map((item, index) => `
                <li>
                    ${item}
                    <button onclick="removeIngredient(${index})">❌</button>
                </li>
            `).join("");
    }

    window.removeIngredient = function(index) {
        pantry.splice(index, 1);
        renderPantry();
    }

    addBtn.addEventListener("click", () => {
        const value = input.value.trim();
        if (value !== "") {
            pantry.push(value);
            input.value = "";
            renderPantry();
        }
    });

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });

    searchBtn.addEventListener("click", () => {
        if (pantry.length === 0) {
            alert("Please add ingredients first.");
            return;
        }

        showMockRecipes();
    });

    function showMockRecipes() {
        const mockRecipes = [
            {
                title: "Garlic Chicken Bowl",
                image: "https://via.placeholder.com/250"
            },
            {
                title: "Fresh Garden Salad",
                image: "https://via.placeholder.com/250"
            },
            {
                title: "Pasta Primavera",
                image: "https://via.placeholder.com/250"
            }
        ];

        recipeResults.innerHTML = mockRecipes.map(recipe => `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            </div>
        `).join("");
    }

});
