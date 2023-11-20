function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

//from
const form = document.querySelector("form");

const firstName = form.querySelector("input[name='first']");
const lastName = form.querySelector("input[name='last']");
const email = form.querySelector("input[name='email']");
const birthdayInput = form.querySelector("input[name='birthdate']");
const eventNumber = form.querySelector("input[name='quantity']");
const cityInput = form.querySelector("input[name='location']");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close Modal
const close = document.querySelector(".close");

const closeModal = () => {
  modalbg.style.display = "none";
};
close.addEventListener("click", closeModal);

//verifier le nom
const validerNom = (nom) => {
  let nomRegExp = new RegExp("[a-z0-9._-]+\\w{1}");
  if (!nomRegExp.test(nom)) {
    // console.log("Le nom n'est pas valide.");
    throw new Error("Le nom n'est pas valide, Minimum 2 caractères.");
  }
};

//vérifier le prénom
const validerPre = (nom) => {
  let nomRegExp = new RegExp("[a-z0-9._-]+\\w{1}");
  if (!nomRegExp.test(nom)) {
    // console.log("Le nom n'est pas valide.");
    throw new Error("Le prénom n'est pas valide, Minimum 2 caractères.");
  }
};

// Fonction pour afficher un message d'erreur
const afficherMessageErreur = (input, message) => {
  const formDataDiv = input.parentElement; // Récupère l'élément parent de l'input
  console.log(formData);

  formDataDiv.setAttribute("data-error-visible", "true");
  formDataDiv.setAttribute("data-error", message);
};

// Fonction pour masquer le message d'erreur
const masquerMessageErreur = (input) => {
  const formDataDiv = input.parentElement; // Récupère l'élément parent de l'input

  formDataDiv.removeAttribute("data-error-visible");
  formDataDiv.removeAttribute("data-error");
};

//check email :
// const validerEmail = () => {
//   let emailRegExp = new RegExp(
//     "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+\\w{2}"
//   );
//   if (!emailRegExp.test(email)) {
//     afficherMessageErreur(email, "L'email n'est pas valide.");
//   }
// };

const validerEmail = () => {
  let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegExp.test(email.value)) {
    afficherMessageErreur(email, "L'email n'est pas valide.");
  } else {
    masquerMessageErreur(email);
  }
};

//valider date de naissance
const birthdayDate = (birthdate) => {
  if (!birthdate) {
    afficherMessageErreur(
      birthdayInput,
      "Vous devez entrer votre date de naissance."
    );
    return;
  }

  // Calculer age
  const userBirthdate = new Date(birthdate);
  console.log(userBirthdate);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - userBirthdate.getFullYear();

  // vérifier l'age
  if (age >= 16) {
    console.log("You are eligible to subscribe.");
  } else {
    afficherMessageErreur(
      birthdayInput,
      "Vous devez avoir plus de 16 ans pour vous inscrire."
    );
  }
};

//tournois champs
const Eventnumber = () => {
  if (eventNumber.value === "") {
    afficherMessageErreur(
      eventNumber,
      "Veuillez saisir votre numéro de tournoi."
    );
  }
};

// City options
const cityOptions = () => {
  const selectedCity = document.querySelector("input[name='location']:checked");

  if (!selectedCity) {
    afficherMessageErreur(cityInput, "Vous devez sélectionner une ville.");
  } else {
    masquerMessageErreur(cityInput);
  }
};

// Local storage
let dataUser = JSON.parse(localStorage.getItem("data")) || {};
console.log(dataUser);

//Notification message for inscription
//notification
const showModalNotification = () => {
  const modal = document.querySelector(".show_modal");

  modal.style.display = "block";
  

  // if (dataUser) {
  //   modal.style.display = "block";
  // }
};

//fermer le message de notification

const closeModalNotidicaton = () => {
  const modalBtn = document.querySelector(".show_modal");

  modalBtn.addEventListener("click", (e) => {
    console.log("clicked");
    e.preventDefault();
    modalBtn.style.display = "none";
  });
};

closeModalNotidicaton();

//valider formulaire

const validerFormulaire = () => {
  const form = document.querySelector("form[name='reserve']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validation du prénom
    if (firstName.value.trim().length < 2) {
      afficherMessageErreur(
        firstName,
        "Le prénom doit avoir au moins 2 caractères."
      );
    } else {
      masquerMessageErreur(firstName);
    }

    // Validation du nom
    if (lastName.value.trim().length < 2) {
      afficherMessageErreur(
        lastName,
        "Le nom doit avoir au moins 2 caractères."
      );
    } else {
      masquerMessageErreur(lastName);
    }

    //valider email
    validerEmail();

    // Validation de la date de naissance
    birthdayDate(birthdayInput.value);

    //valider event
    Eventnumber();

    //valider ville
    cityOptions();

    // Ajouter les données au localStorage
    dataUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      birthdate: birthdayInput.value,
      eventnumber: eventNumber.value,
      cityInput: cityInput ? cityInput.value : null,
    };

    localStorage.setItem("data", JSON.stringify(dataUser));

    // if (dataUser) {
    //   const contentForm = document.querySelector(".bground");
    //   contentForm.style.display = "none";
    //   // showModalNotification();
    // }
  });
};

// Appel de la fonction pour valider le formulaire
validerFormulaire();

// vider les champs du formulaire apres l'envoi
// const viderChamps = () => {
//   const sucess = validerFormulaire();
//   if (sucess) {
//     firstName.value = "";
//     lastName.value = "";
//     email.value = "";
//     eventNumber.value = "";
//     cityInput.value = "";
//     selectedCity.value = "";
    
//   }
// };

// viderChamps();
