const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    // console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
};

// create loadCategories-start 
const loadData = () =>{
    // preventDefault();
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then ((res) => res.json())
    .then ((data) => displayshow(data.categories))
};
// create loadCategories-End


// create loadAllPets-start
const loadAllPets = async () =>{
    // loadingspinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    // displayAllPet(data.pets)

    setTimeout(() =>{
        displayAllPet(data.pets)
        // loadingspinner(false);
    }, 2000)
};
// create loadAllPets-End
const loadCategoriesPet = (category) =>{
    // alert(category)
    // loadingspinner(true);

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then ((res) => res.json())
    .then ((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("active");
        // displayAllPet(data.data)
        setTimeout(()=>{
            displayAllPet(data.data)
            // loadingspinner(false);
        },2000)
    })
    .catch((error) => console.log(error));
}

// create loadAllPets-start
const displayAllPet =(pets)=>{
    // console.log(pets);

    const Allcategoriespet = document.getElementById('All_categories_pet');
  
    Allcategoriespet.innerHTML=""; 
    if (pets.length == 0) {
        Allcategoriespet.classList.remove("grid")
        Allcategoriespet.innerHTML=
        `
        <div class="min-h-[300] flex flex-col justify-center items-center bg-base-200 py-12 rounded-xl">
                
                    <img src="../assets/error.webp" alt=""/>
                    <h3 class="text-2xl font-bold mb-4">No Information Available</h3>
                    <p class="w-4/6 text-center" >
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                        its layout. The point of using Lorem Ipsum is that it has a.
                    </p>
        </div>
        `;
        return
    }else{
        Allcategoriespet.classList.add("grid");
    }

    pets.forEach((pet) => {
        // console.log(pet);
        const card = document.createElement('div');
        card.classList = "border p-5 card card-compact bg-base-100";
        card.innerHTML = 
        `
            <figure>
                <img class="w-full h-full object-cover" src="${pet.image || "No Available"}" alt="images"/>
            </figure>
            <div class="card-body border-b">

             <h2 class="card-title text-2xl font-bold">${pet.pet_name || "No Available"}</h2>

             <div class = "flex items-center gap-2 text-base text-gray-500">
                 <i class="fa fa-th-large" aria-hidden="true"></i>
                 <p>Breed : ${pet.breed || "No Available"}</p>
             </div>


             <div class = "flex items-center gap-2 text-base text-gray-500">
                 <i class="fa fa-calendar" aria-hidden="true"></i>
                 <p>Birth : ${pet.date_of_birth || "No Available"}</p>
             </div>

             <div class = "flex items-center gap-2 text-base text-gray-500">
                 <i class="fa fa-mercury" aria-hidden="true"></i>
                 <p>Gender : ${pet.gender || "No Available"}</p>
             </div>

             <div class = "flex items-center gap-2 text-base text-gray-500">
                 <i class="fa fa-usd" aria-hidden="true"></i>
                 <p>Price : ${pet.price || "No Available"}</p>
             </div>

         </div>

         <div class="flex justify-between items-center mt-4">
             <button onclick="loadAllLikePets('${pet.petId}')" class="border border-[#dbebec] text-[#0e7a81] rounded-xl py-2 px-3"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
             <button id="adoptButton" onclick="loadAllAdpotPets('${pet.petId}')" class="border border-[#dbebec] rounded-xl font-bold text-[#0e7a81] py-2 px-3">Adopt</button>
             <button onclick="loadAllPetsDetails('${pet.petId}')" class="border border-[#dbebec] rounded-xl font-bold text-[#0e7a81] py-2 px-3">Details</button>
         </div> 

        `;
        Allcategoriespet.append(card)

    });  
}


// create loadAllPetsDetails-start

const loadAllPetsDetails = async (petId) =>{
    // console.log(petId);

    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res =  await fetch(url);
    const data =  await res.json();
    displayDetails(data.petData);
}

const displayDetails = (petsDetails) =>{
    console.log(petsDetails);
    const modalContent = document.getElementById("modal-content")
    // const modalContent2 = document.getElementById("modal-content2")

    modalContent.innerHTML =
    `
    <img class="w-full h-full object-cover rounded-xl mb-4" src="${petsDetails.image}" alt=""/>
    <h3 class="text-lg font-bold">${petsDetails.pet_name}</h3>

    <div class="grid grid-cols-1 lg:grid-cols-2 pb-4 border-b mb-4">
        <div>
            <div class = "flex items-center gap-2 text-base text-gray-500">
                    <i class="fa fa-th-large" aria-hidden="true"></i>
                    <p>Breed : ${petsDetails.breed}</p>
            </div>
    
            <div class = "flex items-center gap-2 text-base text-gray-500">
                                    <i class="fa fa-mercury" aria-hidden="true"></i>
                    <p>Gender : ${petsDetails.gender}</p>
            </div>
    
            <div class = "flex items-center gap-2 text-base text-gray-500">
                    <i class="fa fa-mercury" aria-hidden="true"></i>
                    <p> vaccinatedstatus : ${petsDetails.vaccinated_status || No }</p>
            </div>
    
        </div>
    
    
        <div>
            <div class = "flex items-center gap-2 text-base text-gray-500">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <p>Birth : ${petsDetails.date_of_birth || "No Data Available"}</p>
            </div>
    
            <div class = "flex items-center gap-2 text-base text-gray-500">
                    <i class="fa fa-usd" aria-hidden="true"></i>
                    <p>Price : ${petsDetails.price}</p>
            </div>
        </div>
    
    </div>

    <p>${petsDetails.pet_details}</p>
    
                    
    <div class="modal-action" >
        <form method="dialog"">
            <button class="btn-1 font-semibold text-[#0e7a81]">Cancel</button> 
        </form>
    </div>
    `;

    // way-1
    // document.getElementById("showModalData").click()
    // way-2
        document.getElementById("customModal").showModal();
    // document.getElementById("customModal2").showModal();
    
}

// create loadAllPetsDetails-end

// create loadAllPets-End

// create loadCategories-start 
const displayshow = (categories) => {

    const paddy_Categories = document.getElementById('paddycategories');

    categories.forEach((item) => {
        // console.log(item);
        const buttonContainer = document.createElement('div')
        buttonContainer.classList = 'text-xl mx-auto';
        buttonContainer.innerHTML =
        `
        <button id="btn-${item.category}" onclick="loadCategoriesPet('${item.category}')" class ="btn category-btn">
            <img class ="w-8" src="${item.category_icon}" alt="">  ${item.category}
        </button>
        `; /* `<img class ="w-8 " src="${item.category_icon}" alt="">  ${item.category}` */ 
        paddy_Categories.append(buttonContainer);
    });
};
// create loadCategories-End



const loadAllAdpotPets = async (petId) =>{
    console.log(petId);
    const url2 = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url2)
    const data = await res.json();
    displayAdpotPets(data.petData);
}

const displayAdpotPets = (AdpotPets) =>{
    // console.log(AdpotPets);
    const modalContent2 = document.getElementById("modal-content2")

    modalContent2.innerHTML =
    `
        <div class="text-center">
            <img class="mx-auto w-24 mb-4" src="../assets/congrats.png" alt=""/>
            <h3 class="text-5xl font-bold mb-5">congrates</h3>

            <p>Adoption Process is Start For Your Pet</p>
    
            <p id="countdown"></p>
        </div>
    `;

    // way-2
    document.getElementById("customModal2").showModal();

    let timeLeft = 3;
    const countDown = document.getElementById("countdown");
    countDown.innerHTML = `${timeLeft}`;
    // console.log(countDown);

    const countdownInterval = setInterval(() => {
        timeLeft--;
        countDown.innerHTML = `${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            closeModalAndDisableButton();
        }
    }, 1000);
}

    const closeModalAndDisableButton = () => {
        document.getElementById("customModal2").close();
        const adoptButton = document.getElementById("adoptButton");
        console.log(adoptButton);

        /* problems */
        if (adoptButton) {
            adoptButton.disabled = true;

        }  /* problems */
    } 


// loadlikeBtn

const loadAllLikePets = async (petId) =>{
    // console.log(petId);
    const url2 = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url2)
    const data = await res.json();
    displayLikePets(data.petData);
}

const displayLikePets =(petLike) =>{
    console.log(petLike);

    const load_like_Btn =document.getElementById("loadlikeBtn");
    // load_like_Btn.innerHTML = "";

    const img = document.createElement("img");
    img.src = petLike.image;
    img.alt = "Pet Image";
    img.classList.add("rounded-xl","mb-4");

    // Append the image to the div
    load_like_Btn.append(img);
}


loadData();
loadAllPets()
