const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; 
const pantryList = [];

document.getElementById('add-btn').addEventListener('click', () => {
    const input = document.getElementById('ingredient-input');
    if (input.value) {
        pantryList.push(input.value);
        renderPantry();
        input.value = '';
    }
});

async function getRecipes() {
    const ingredients = pantryList.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-results');
    container.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>Uses ${recipe.usedIngredientCount} of your items</p>
        </div>
    `).join('');
}

document.getElementById('search-recipes-btn').addEventListener('click', getRecipes);

function renderPantry() {
    const list = document.getElementById('pantry-list');
    list.innerHTML = pantryList.map(item => `<li>${item}</li>`).join('');
}

<script src="js/main.js" type="module"></script>