const findJuice = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
        .then(res => res.json())
        .then(data => {
            displayData(data.drinks);
        });
};

findJuice();

const displayData = (data) => {
    const juiceDetails = document.getElementById('juice');
    juiceDetails.innerHTML = "";
    data.forEach(juice => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-100">
        <img src="${juice.strDrinkThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${juice.strDrink}</h5>
          <button type="button" onclick="displayDetails('${juice.idDrink}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Details
          </button>
        </div>
      </div>`;
        juiceDetails.appendChild(div);
    });
};

const displayDetails = (details) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`;
    fetch(url)
        .then(res => res.json())
        .then(value => findmore(value.drinks[0]));
};

const findmore = (value) => {
    console.log("here", value);
    const pdetauls = document.getElementById('modalcheck');
    pdetauls.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-3">
    <img src="${value.strDrinkThumb}" class="card-img-top w-25" alt="...">
    <div class="card-body">
      <h5 class="card-title">${value.strDrink}</h5>
      <h3>Ingredients:</h3>
      <ul>
        <li>${value.strIngredient1}</li>
        <li>${value.strIngredient2}</li>
        <li>${value.strIngredient3}</li>
        <li>${value.strIngredient4}</li>
        <li>${value.strIngredient5}</li>
      </ul>
      <p class="card-text">
      ${value.strInstructions}
      </p>
    </div>
  </div>`;
    pdetauls.appendChild(div);
};

const searchjuice = () => {
    const jui = document.getElementById('cocktail');
    const juicii = jui.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${juicii}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaysearch(data.drinks);
        });
    jui.value = "";
};

const displaysearch = (data) => {
    if (data == null) {
        alert("Not found! please enter valid name");
    }
    const juiceDetails = document.getElementById('juice');
    juiceDetails.textContent = "";
    const cock = document.getElementById('results');
    cock.textContent = "";
    data.forEach(cocks => {
        const div = document.createElement('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="${cocks.strDrinkThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${cocks.strDrink}</h5>
        </div>
        <button type="button" onclick="displayDetails('${cocks.idDrink}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Details
         </button>
      </div>
      `;
        cock.appendChild(div);
    });
};