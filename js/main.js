document.addEventListener("DOMContentLoaded", () => {

    console.log("JS Loaded!");

    const pantry = JSON.parse(localStorage.getItem("pantry")) || [];

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

        localStorage.setItem("pantry", JSON.stringify(pantry));
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

    // Add on Enter
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });

    // Show recipes
    searchBtn.addEventListener("click", () => {

        if (pantry.length === 0) {
            alert("Please add ingredients first.");
            return;
        }

        const mockRecipes = [
            {
                title: "Garlic Chicken Bowl",
                image: "https://picsum.photos/400/250?random=1",
                description: `
                    <p><strong>Ingredients:</strong> Chicken, garlic, rice, broccoli</p>
                    <p><strong>Instructions:</strong> 
                    1. Cook chicken with garlic.
                    2. Steam broccoli.
                    3. Serve over rice.</p>
                `
            },
            {
                title: "Fresh Garden Salad",
                image: "https://picsum.photos/400/250?random=2",
                description: `
                    <p><strong>Ingredients:</strong> Lettuce, tomato, cucumber, olive oil</p>
                    <p><strong>Instructions:</strong> 
                    1. Chop vegetables.
                    2. Toss with olive oil.
                    3. Serve fresh.</p>
                `
            },
            {
                title: "Pasta Primavera",
                image: "https://picsum.photos/400/250?random=3",
                description: `
                    <p><strong>Ingredients:</strong> Pasta, zucchini, bell peppers, cream</p>
                    <p><strong>Instructions:</strong> 
                    1. Boil pasta.
                    2. Sauté vegetables.
                    3. Mix with cream sauce and combine.</p>
                `
            }
        ];

        // Display recipe cards
        recipeResults.innerHTML = mockRecipes.map((recipe, index) => `
            <div class="recipe-card" data-index="${index}">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <div class="recipe-description" style="display:none;">
                    ${recipe.description}
                </div>
            </div>
        `).join("");

        // Add click event to each recipe card
        document.querySelectorAll(".recipe-card").forEach(card => {
            card.addEventListener("click", () => {
                const description = card.querySelector(".recipe-description");

                // Toggle visibility
                if (description.style.display === "none") {
                    description.style.display = "block";
                } else {
                    description.style.display = "none";
                }
            });
        });

    });

    renderPantry();

});
