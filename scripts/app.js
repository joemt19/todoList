
/**
 * @param {string} elem 
 */
function ajouter(elem) {
    const li = document.createElement('li'); 
    li.innerHTML += 
        `<div class="task ${localStorage.length + 1}">
            <input type="checkbox">${elem}
        </div>
        <button class="delete">X</button>`;
    list.prepend(li);
}

/**
 * 
 * @param {object} tasks 
 */
function recuperer(tasks) {
    const li = document.createElement('li');
    li.innerHTML += 
        `<div class="task ${tasks.id}">
            <input type="checkbox">${tasks.sujet}
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
if (localStorage.length > 0) {
    for (let i = 0 ; i < localStorage.length ; i++) {
        const task = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(localStorage.key(i))
        recuperer(task);
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
    const num = localStorage.length + 1;
    if (localStorage.length !== 0) {
        const lastTask = JSON.parse(localStorage.getItem(localStorage.key(localStorage.length - 1)));
        localStorage.setItem(`task ${num}`,
            JSON.stringify({
                id: lastTask.id + 1,
                 sujet: texte,
                done: false
            })
        );
    } else {
        localStorage.setItem(`task 1`,
            JSON.stringify({
                id: 1,
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
        console.log(e.target.previousSibling.previousSibling.className);
    }
});
