// Liste des taches
let taches = []

// Récupération des éléments
const formulaire =  document.querySelector('form');
const supprimer = document.querySelector('.delete');
const champ = document.querySelector('#newtask');
const list = document.querySelector('ul');

/**
 * Fonction qui prend parametre un objet, le transforme en li et l'ajoute à la liste sur la page
 * @param {object} elem 
 */
function ajouter(elem) {
    const li = document.createElement('li');
    li.innerHTML += 
        `<div class="task" id="${elem.id}">
            ${elem.sujet}
        </div>
        <button class="delete">X</button>`;
    list.prepend(li);
}

// Affichage des tâches existantes
if (localStorage.length > 0) {
    taches = JSON.parse(localStorage.getItem("Taches"))
    for (let i = 0; i < taches.length ; i++) {
        const task = taches[i];
        ajouter(task);
    }
}

// Ajout d'une tache
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const texte = champ.value.trim();
    if (!texte) {
        document.querySelector('.error').classList.remove('hide');
        return;
    };
    document.querySelector('.error').classList.add('hide');
    if (taches.length > 0) {
        const lastTask = taches[taches.length - 1];
        console.log(lastTask, lastTask.id + 1);
        const newTask = {
            id: lastTask.id + 1,
            sujet: texte
        };
        taches.push(newTask);
        ajouter(newTask);
    } else {
        const task1 = {
            id: 1,
            sujet: texte,
        };
        taches.push(task1);
        ajouter(task1);
    }
    champ.value = '';
    champ.focus();
    localStorage.setItem("Taches", JSON.stringify(taches));
})

// Suppression d'une tache
list.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.classList.add('hide');
        parent = e.target.previousSibling.previousSibling; // li correspondant
        taches = taches.filter((elem) => elem.id !== +(parent.id)); // On retire la tache du tableau
        localStorage.setItem("Taches", JSON.stringify(taches));
    }
});