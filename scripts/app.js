// Récupération des éléments
const ajouer =  document.querySelector('form');
const supprimer = document.querySelector('.delete');
const champ = document.querySelector('#newtask');
const list = document.querySelector('ul');
const li = document.createElement('li');

/**
 * @param {string} elem 
 * @return {HTMLElement}
 */
function append(elem) {
    li.innerHTML = 
        `<div class="task">
            <input type="checkbox" name="etat">${elem}
        </div>
        <button class="delete">X</button>`;
    list.appendChild(li);
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
    append(texte);
    champ.value = '';
    champ.focus();
})
