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

    // Show recipes (mock data with real images)
    searchBtn.addEventListener("click", () => {
        if (pantry.length === 0) {
            alert("Please add ingredients first.");
            return;
        }

        const mockRecipes = [
            {
                title: "Garlic Chicken Bowl",
                image: "https://cooking.nytimes.com/recipes/1015290-garlicky-chicken-with-lemon-anchovy-sauce?algo=cooking_search_relevance_metric_ios_and_web&fellback=false&imp_id=1519839394525107&req_id=6280930603588698&surface=cooking-search&variant=0_relevance_reranking"
            },
            {
                title: "Fresh Garden Salad",
                image: "https://cooking.nytimes.com/recipes/1025526-garden-salad?q=garden%20salad"
            },
            {
                title: "Pasta Primavera",
                image: "https://cooking.nytimes.com/recipes/1025478-pasta-primavera"
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
