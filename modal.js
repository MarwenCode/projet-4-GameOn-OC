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
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const eventNumber = document.getElementById("quantity");

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

//valider prénom
// const validerPrenom = (prenom) => {
//   let nameRegExp = new RegExp("[a-z0-9._-]+\\w{2}");
//   if(!nameRegExp.test.prenom) {
//     console.log("le prénom est trop court, Minimum 2 caractères")
//   }
// };

const validerNom = (nom) => {
  let nomRegExp = new RegExp("[a-z0-9._-]+\\w{1}");
  if (!nomRegExp.test(nom)) {
    // console.log("Le nom n'est pas valide.");
    throw new Error("Le nom n'est pas valide, Minimum 2 caractères.");
  }
};
const validerPre = (nom) => {
  let nomRegExp = new RegExp("[a-z0-9._-]+\\w{1}");
  if (!nomRegExp.test(nom)) {
    // console.log("Le nom n'est pas valide.");
    throw new Error("Le prénom n'est pas valide, Minimum 2 caractères.");
  }
};

// gestion d'erreur formulaire
// const afficherMessageErreurfirst = (message) => {
//   let formDataInputFirst = document.querySelector(".formData");
//   formDataInputFirst.setAttribute("data-error-visible", "true");
//   formDataInputFirst.setAttribute("data-error", message);
// };
// const afficherMessageErreurlast = (message) => {
//   let formDataInputLast = document.querySelector("input[name=last]");
//   console.log(formDataInputLast);
//   formDataInputLast.setAttribute("data-error-visible", "true");
//   formDataInputLast.setAttribute("data-error", message);
// };

// const masquerMessageErreur = () => {
//   let formDataInput = document.querySelector(".formData");
//   formDataInput.removeAttribute("data-error-visible");
//   formDataInput.removeAttribute("data-error");
//   let formDataInputLast = document.querySelector("input[name=last]");
//   formDataInputLast.removeAttribute("data-error-visible");
//   formDataInputLast.removeAttribute("data-error");
// };

// const gererFormulaire = () => {
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     console.log("clicked");

//     // const first = firstName.value;
//     // const last = lastName.value;

//     // try {
//     //   validerPre(first);
//     //   masquerMessageErreur("first");

//     //   validerNom(last);
//     //   masquerMessageErreur("last");
//     // } catch (error) {
//     //   afficherMessageErreurfirst(error.message) 
//     //   afficherMessageErreurlast(error.message)
//     //   console.log(error.message);
//     // }

//     const firstName = document.getElementById('first').value.trim();
//     const lastName = document.getElementById('last').value.trim();

//     if (firstName.length < 2 || lastName.length < 2) {
  
//       document.querySelector('.formData[data-error]').setAttribute('data-error-visible', 'true');
//     } else {
//       document.querySelector('.formData[data-error]').setAttribute('data-error-visible', 'false');
    
//       // Add additional logic here to handle form submission
//     }

    
//   });
// };

// gererFormulaire();


// Fonction pour afficher un message d'erreur
const afficherMessageErreur = (input, message) => {
  const formDataDiv = input.parentElement; // Récupère l'élément parent de l'input
  console.log(formData)

  formDataDiv.setAttribute("data-error-visible", "true");
  formDataDiv.setAttribute("data-error", message);
};

// Fonction pour masquer le message d'erreur
const masquerMessageErreur = (input) => {
  const formDataDiv = input.parentElement; // Récupère l'élément parent de l'input

  formDataDiv.removeAttribute("data-error-visible");
  formDataDiv.removeAttribute("data-error");
};

// Fonction pour valider le formulaire
const validerFormulaire = () => {
  const form = document.querySelector("form[name='reserve']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = form.querySelector("input[name='first']");
    const lastName = form.querySelector("input[name='last']");

    // Validation du prénom
    if (firstName.value.trim().length < 2) {
      afficherMessageErreur(firstName, "Le prénom doit avoir au moins 2 caractères.");
    } else {
      masquerMessageErreur(firstName);
    }

    // Validation du nom
    if (lastName.value.trim().length < 2) {
      afficherMessageErreur(lastName, "Le nom doit avoir au moins 2 caractères.");
    } else {
      masquerMessageErreur(lastName);
    }
  });
};

// Appel de la fonction pour valider le formulaire
validerFormulaire();
