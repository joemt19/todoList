
/**
 * @param {string} elem 
 * @return {HTMLElement}
 */
function ajouter(elem) {
    const li = document.createElement('li');
    li.innerHTML += 
        `<div class="task ${localStorage.length}">
            <input type="checkbox">${elem}
        </div>
        <button class="delete">X</button>`;
    list.prepend(li);
}


// Récupération des éléments
const ajouer =  document.querySelector('form');
const supprimer = document.querySelector('.delete');
const champ = document.querySelector('#newtask');
const list = document.querySelector('ul');

// Affichage des tâches
if (localStorage.length >= 0) {
    for (let i = 0; i < localStorage.length; i++) {
        const task = JSON.parse(localStorage.getItem(localStorage.key(i)));
        ajouter(task.sujet);
    }
}

// Ajout des évènements
ajouer.addEventListener('submit', (e) => {
    e.preventDefault();
    const texte = champ.value.trim();
    if (!texte) {
        document.querySelector('.error').classList.remove('hide');
        return;
    };
    document.querySelector('.error').classList.add('hide');
    ajouter(texte);
    if (localStorage.length >= 0) {
        localStorage.setItem(`task ${localStorage.length + 1}`,
            JSON.stringify({
                id: Date.now(),
                sujet: texte,
                done: false
            })
        );
    }
    champ.value = '';
    champ.focus();
})

list.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.classList.add('hide');
        localStorage.removeItem(e.target.previousSibling.previousSibling.className);
    }
});
