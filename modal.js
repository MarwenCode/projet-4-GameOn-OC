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
  masquerMessageErreur(birthdayInput);
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
  return;
};

//tournois champs
const Eventnumber = () => {
  masquerMessageErreur(eventNumber);
  if (eventNumber.value === "") {
    afficherMessageErreur(
      eventNumber,
      "Veuillez saisir le nombre de vos participations."
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


    //afficher la modal apres validation du formulaire
    // const errorElements = document.querySelectorAll(
    //   "[data-error-visible='true']"
    // );
    // console.log(errorElements.length);

    // if (errorElements.length === 0) {
    //   // Utilisation de la fonction avec un message spécifique
    //   showModalNotification("Merci pour votre inscription!");
    //   modalbg.style.display = "none";
     
    // }


    showModalNotification("Merci pour votre inscription!");
    
  });
};

// Appel de la fonction pour valider le formulaire
validerFormulaire();

// Créer un modal de notification
const showModalNotification = (message) => {
  // Créer les éléments du modal
  // const bground = document.createElement("div");
  const content = document.createElement("div");
  const modalBody = document.createElement("div");
  const msg = document.createElement("p");
  const btn = document.createElement("button");

  // Ajouter des classes aux éléments pour le style

  // bground.classList.add("bground");
  content.classList.add("content");
  modalBody.classList.add("modal-body");

  // msg.classList.add("msg");
  btn.classList.add("btn-submit");

  // Ajouter le texte au paragraphe
  content.style.transform = "translate(0%, -120%)";
  content.style.zIndex = "1";

  msg.textContent = message;
  msg.style.padding = "300px 25px";
  msg.style.fontSize = "30px";
  msg.style.textAlign = "center";

  // Ajouter le bouton "Fermer"
  btn.textContent = "Fermer";
  btn.style.justifyContent = "center";
  btn.addEventListener("click", () => {
    // Fermer le modal en supprimant l'élément de la page
    document.body.removeChild(content);
    restFormulaire();

   
  });

  // Ajouter les éléments au modal
  content.append(modalBody);
  modalBody.append(msg);
  modalBody.append(btn);

  // Ajouter le modal à la page
  document.body.append(content);

  //add scroll top to display this modal
  // Scroll up
  window.scrollTo({ top: 0, behavior: "smooth" });

 
};

//rest formulaire
const restFormulaire = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  birthdayInput.value = "";
  eventNumber.value = "";
  cityInput.checked = false;


};
