const loadAllMeal = (search) => {
    const fetchUrl = `https://www.themealdb.com/api/json/v1/1//search.php?s=${search}`
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => showAllMeal(data.meals))
}

const showAllMeal = allmeals => {
    const displayMeal = document.getElementById('display-meal')
    displayMeal.innerHTML = ``

    const notFoundMeal = document.getElementById('not-found-meal')
    
    if (!allmeals || allmeals.length === 0) {
        notFoundMeal.classList.remove('d-none')
    } else {
        notFoundMeal.classList.add('d-none')

        for (const meal of allmeals) {
            const mealContainer = document.createElement('div')
            mealContainer.innerHTML = `
                <div class="col mb-4">
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 180)}</p>
                            <button onclick="loadFoodDetails(${meal.idMeal})" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetailsModal">Details!</button>
                        </div>
                    </div>
                </div>
            `
            displayMeal.appendChild(mealContainer)
            
        }
    }
    loadSpinner(false)
}


const showFood = () => {
    const searchFood = document.getElementById('search-food')
    const searchFoodResult = searchFood.value
    loadAllMeal(searchFoodResult)
    searchFood.value = ''
    loadSpinner(true)
}

const loadSpinner = isLoading => {
    const loaderApi = document.getElementById('loader')
    if(isLoading){
        loaderApi.classList.remove('d-none')
    }
    else{
        loaderApi.classList.add('d-none')
    }
}

document.getElementById('search-food').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        showFood()
    }
})

const loadFoodDetails = (idMeal) => {
    const detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(detailsUrl)
    .then(res => res.json())
    .then(data => allMealDetails(data.meals[0]))
}

const allMealDetails = allmeals => {
    console.log(allmeals)
    const mealDetailsModalLabel = document.getElementById('mealDetailsModalLabel')
    mealDetailsModalLabel.innerText = allmeals.strMeal
    const mealDetailsModal = document.getElementById('meal-details-modal')
    mealDetailsModal.innerHTML = `
        <img class="card-img-top" src=${allmeals.strMealThumb}>
        <p class="mt-3">Meal Details: ${allmeals.strInstructions}</p>
    `
}


// const showFoodDetail = meals => {
//     const showFoodDetailsContainer = document.getElementById('show-food-details')
//     const showFoodDetailsDiv = document.createElement('div')
//     showFoodDetailsContainer.innerHTML = ``
//     showFoodDetailsDiv.innerHTML = `
//             <div class="card" style="width: 18rem;">
//             <img class="card-img-top" src="${meals.strMealThumb}" alt="Card image cap">
//             <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            
//             </div>
//             </div>
//     `
//     showFoodDetailsContainer.appendChild(showFoodDetailsDiv)

// }

loadAllMeal('')