console.log("JS Loaded");


const API_KEY = 'ef00566b36744d018f4952a7ee6c078a'; 
const pantryList = [];

const addBtn = document.getElementById('add-btn');
const searchBtn = document.getElementById('search-recipes-btn');
const ingredientInput = document.getElementById('ingredient-input');
const pantryUL = document.getElementById('pantry-list');
const recipeContainer = document.getElementById('recipe-results');

// Add Ingredient
addBtn.addEventListener('click', () => {
    const value = ingredientInput.value.trim();

    if (value !== '') {
        pantryList.push(value);
        ingredientInput.value = '';
        renderPantry();
    }
});

// Render Pantry List
function renderPantry() {
    pantryUL.innerHTML = pantryList
        .map(item => `<li>${item}</li>`)
        .join('');
}

// Fetch Recipes
async function getRecipes() {
    if (pantryList.length === 0) {
        alert("Please add at least one ingredient.");
        return;
    }

    const ingredients = pantryList.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        displayRecipes(data);

    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = "<p>Unable to fetch recipes. Check API key.</p>";
    }
}

// Display Recipes
function displayRecipes(recipes) {
    recipeContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Uses ${recipe.usedIngredientCount} of your ingredients</p>
        </div>
    `).join('');
}

searchBtn.addEventListener('click', getRecipes);
