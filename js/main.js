const dogApiRandom = "https://dog.ceo/api/breeds/image/random";
const dogApiList = "https://dog.ceo/api/breeds/list/all";
const dogApiRandomUrlWhenSelectedOption = "";

const container = document.querySelector(".app-container");
const select = document.querySelector(".app-select");
const image = document.querySelector(".app-image");
const spinner = document.querySelector(".app-spinner");

function init() {

  fetch(dogApiList)
    .then(function(listResponse) {
      return listResponse.json();
    })
    .then(function(listResponse) {
      const listBreedsObj = listResponse.message;
      const listBreedsArray = Object.keys(listBreedsObj);
      for (var i = 0; i < listBreedsArray.length; i++) {
        const option = document.createElement("option");
        option.value = listBreedsArray[i];
        option.innerText = listBreedsArray[i];
        option.classList.add("app-option");
        select.appendChild(option);
      }
    });
  
  fetch(dogApiRandom)
    .then(function(randomResponse) {
      console.log(randomResponse);
      return randomResponse.json();
    })
    .then(function(randomResponse) {
      image.src = randomResponse.message;
    })

  select.addEventListener("change", breedSelectedOption);

  image.addEventListener("load", showImage);

  function showImage() {
    image.classList.add("show");
    spinner.classList.remove("show");
  }

  function showSpinner() {
    image.classList.remove("show");
    spinner.classList.add("show");
  }

  function breedSelectedOption(e) {
    const optionSelected = e.target.value;
    const dogApiRandomUrlWhenSelectedOption = "https://dog.ceo/api/breed/"+optionSelected+"/images/random";

    showSpinner();    
  
    fetch(dogApiRandomUrlWhenSelectedOption)
      .then(function(selectedOptionResponse) {
        return selectedOptionResponse.json();
      })
      .then(function(selectedOptionResponse) {
        image.src = selectedOptionResponse.message;
      });
  }


}

init();